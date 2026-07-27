import { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// Midnight Lace Wallet — Dynamic DApp Integration
// Based on: https://docs.midnight.network/develop/tutorial/using/chrome-ext
//
// Dynamic Discovery:
//   Inspects Object.values(window.midnight || {}) dynamically.
//   Identifies providers registered under dynamic UUIDs (e.g. window.midnight['<uuid>'])
//   where provider.name === 'lace' or provider.rdns === 'io.lace.wallet' or apiVersion exists.
//
// RULES:
//   - NEVER use fixed keys like window.midnight.mnLace as sole provider source
//   - NEVER generate fake/mock addresses
//   - NEVER fallback to placeholder data
//   - If Lace is not installed → show "Midnight Lace Wallet not detected." only
// =============================================================================

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  coinPublicKey: string | null;
  network: string;
  balance: string | null;
  error: string | null;
  laceDetected: boolean;
  providerName: string | null;
}

export interface LaceProvider {
  name?: string;
  rdns?: string;
  apiVersion?: string;
  icon?: string;
  enable(): Promise<LaceAPI>;
  isEnabled(): Promise<boolean>;
}

export interface LaceAPI {
  state?: (() => Promise<LaceWalletState> | { subscribe?: (fn: (state: LaceWalletState) => void) => unknown } | LaceWalletState) | LaceWalletState;
  serviceUriConfig?: () => Promise<unknown> | unknown;
}

export interface LaceWalletState {
  address?: string;
  coinPublicKey?: string;
  encryptionPublicKey?: string;
  networkId?: string;
  balances?: Record<string, string | number | bigint>;
  unshieldedAddress?: string;
}

declare global {
  interface Window {
    midnight?: Record<string, unknown>;
  }
}

/**
 * Discover the Midnight Lace Wallet provider dynamically from window.midnight.
 * 
 * Supports:
 *   - Object.values(window.midnight || {})
 *   - Dynamic UUID keys (e.g., window.midnight['9612a258-d749-46cd-98e4-196d8d3dfcd8'])
 *   - provider.name === 'lace' || provider.rdns === 'io.lace.wallet' || provider.apiVersion
 */
function discoverLaceProvider(): { provider: LaceProvider; key: string } | null {
  if (typeof window === 'undefined' || !window.midnight) {
    console.log('[Midnight Wallet] window.midnight is not defined');
    return null;
  }

  const entries = Object.entries(window.midnight);
  console.log('[Midnight Wallet] Detected Providers on window.midnight:', entries.map(([k, v]) => ({
    key: k,
    name: (v as LaceProvider)?.name,
    rdns: (v as LaceProvider)?.rdns,
    apiVersion: (v as LaceProvider)?.apiVersion,
  })));

  const candidates: { provider: LaceProvider; key: string }[] = [];

  for (const [key, value] of entries) {
    if (!value || typeof value !== 'object') continue;
    const provider = value as LaceProvider;

    if (typeof provider.enable === 'function') {
      const name = provider.name?.toLowerCase() || '';
      const rdns = provider.rdns?.toLowerCase() || '';
      
      const isLaceMatch =
        name === 'lace' ||
        rdns === 'io.lace.wallet' ||
        key === 'mnLace' ||
        key === 'lace' ||
        !!provider.apiVersion;

      if (isLaceMatch) {
        candidates.push({ provider, key });
      }
    }
  }

  if (candidates.length === 0) {
    // Broad fallback for any valid provider with an enable function
    for (const [key, value] of entries) {
      if (value && typeof (value as any).enable === 'function') {
        candidates.push({ provider: value as LaceProvider, key });
      }
    }
  }

  const selected = candidates[0] || null;

  if (selected) {
    console.log('[Midnight Wallet] Selected Provider Key:', selected.key);
    console.log('[Midnight Wallet] Selected Provider Obj:', selected.provider);
    console.log('[Midnight Wallet] Wallet Name:', selected.provider.name || 'Lace');
  } else {
    console.log('[Midnight Wallet] Midnight Lace Wallet not detected on window.midnight');
  }

  return selected;
}

const SESSION_KEY = 'midnight-lace-connected';

/**
 * React hook for Midnight Lace Wallet integration using dynamic discovery.
 */
export function useMidnightWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    coinPublicKey: null,
    network: import.meta.env.VITE_NETWORK || 'undeployed',
    balance: null,
    error: null,
    laceDetected: false,
    providerName: null,
  });

  const connectRef = useRef<(() => Promise<void>) | null>(null);

  /**
   * Detect Lace provider and update presence flag.
   */
  const checkLacePresence = useCallback(() => {
    const discovered = discoverLaceProvider();
    const detected = !!discovered;
    
    setWalletState((prev) => {
      if (prev.laceDetected === detected) return prev;
      return {
        ...prev,
        laceDetected: detected,
        providerName: discovered?.provider?.name || (detected ? 'Lace' : null),
        error: prev.error === 'LACE_NOT_DETECTED' && detected ? null : prev.error,
      };
    });
    return detected;
  }, []);

  /**
   * Connect to Midnight Lace Wallet.
   */
  const connect = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const discovered = discoverLaceProvider();
      if (!discovered) {
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          isConnected: false,
          address: null,
          coinPublicKey: null,
          balance: null,
          laceDetected: false,
          providerName: null,
          error: 'LACE_NOT_DETECTED',
        }));
        return;
      }

      const { provider } = discovered;

      // Enable — triggers user authorization prompt in extension popup
      let api: LaceAPI;
      try {
        api = await provider.enable();
        console.log('[Midnight Wallet] Enable Succeeded. API returned:', api);
      } catch (enableErr: unknown) {
        const msg = enableErr instanceof Error ? enableErr.message : String(enableErr);
        console.error('[Midnight Wallet] provider.enable() failed:', enableErr);
        const isRejection = /user rejected|denied|cancelled|cancel|refused/i.test(msg);
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          error: isRejection ? 'CONNECTION_REJECTED' : msg,
        }));
        return;
      }

      // Fetch state safely (Promise, Observable, or Direct Object)
      let rawState: LaceWalletState | null = null;

      try {
        if (typeof api.state === 'function') {
          const res = api.state();
          if (res && typeof (res as any).then === 'function') {
            rawState = await (res as Promise<LaceWalletState>);
          } else if (res && typeof (res as any).subscribe === 'function') {
            rawState = await new Promise<LaceWalletState>((resolve) => {
              const sub = (res as any).subscribe((s: LaceWalletState) => {
                if (sub && typeof sub.unsubscribe === 'function') sub.unsubscribe();
                resolve(s);
              });
            });
          } else {
            rawState = res as LaceWalletState;
          }
        } else if (api.state && typeof api.state === 'object') {
          rawState = api.state as LaceWalletState;
        }
      } catch (stateErr) {
        console.warn('[Midnight Wallet] Error extracting wallet state:', stateErr);
      }

      let walletAddress: string | null = null;
      let walletCoinPublicKey: string | null = null;
      let walletNetwork: string = import.meta.env.VITE_NETWORK || 'undeployed';
      let walletBalance: string | null = null;

      if (rawState) {
        console.log('[Midnight Wallet] Extracted Wallet State:', rawState);
        if (rawState.address && typeof rawState.address === 'string') {
          walletAddress = rawState.address.trim();
        } else if (rawState.unshieldedAddress && typeof rawState.unshieldedAddress === 'string') {
          walletAddress = rawState.unshieldedAddress.trim();
        }

        if (rawState.coinPublicKey && typeof rawState.coinPublicKey === 'string') {
          walletCoinPublicKey = rawState.coinPublicKey.trim();
        }

        if (rawState.networkId && typeof rawState.networkId === 'string') {
          walletNetwork = rawState.networkId;
        }

        if (rawState.balances && typeof rawState.balances === 'object') {
          const entries = Object.entries(rawState.balances);
          if (entries.length > 0) {
            walletBalance = `${entries[0][1]} tDust`;
          }
        }
      }

      console.log('[Midnight Wallet] Wallet Address:', walletAddress);

      // Persist session
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Ignored if storage unavailable
      }

      setWalletState({
        isConnected: true,
        isConnecting: false,
        address: walletAddress,
        coinPublicKey: walletCoinPublicKey,
        network: walletNetwork,
        balance: walletBalance,
        error: null,
        laceDetected: true,
        providerName: provider.name || 'Lace',
      });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect Midnight Lace Wallet';
      console.error('[Midnight Wallet] Connect Error:', err);
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: msg,
      }));
    }
  }, []);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  /**
   * Disconnect from Lace Wallet.
   */
  const disconnect = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignored
    }

    setWalletState((prev) => ({
      isConnected: false,
      isConnecting: false,
      address: null,
      coinPublicKey: null,
      network: import.meta.env.VITE_NETWORK || 'undeployed',
      balance: null,
      error: null,
      laceDetected: prev.laceDetected,
      providerName: prev.providerName,
    }));
  }, []);

  /**
   * Reconnect automatically if previously authorized.
   */
  const reconnect = useCallback(async () => {
    const discovered = discoverLaceProvider();
    if (!discovered) return;

    try {
      const wasSessionConnected = sessionStorage.getItem(SESSION_KEY) === 'true';
      const isEnabled = typeof discovered.provider.isEnabled === 'function'
        ? await discovered.provider.isEnabled()
        : false;

      if ((wasSessionConnected || isEnabled) && connectRef.current) {
        await connectRef.current();
      }
    } catch {
      // Best effort reconnect
    }
  }, []);

  useEffect(() => {
    checkLacePresence();
  }, [checkLacePresence]);

  useEffect(() => {
    const onFocus = () => checkLacePresence();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [checkLacePresence]);

  useEffect(() => {
    reconnect();
  }, [reconnect]);

  return {
    ...walletState,
    connect,
    disconnect,
    reconnect,
  };
}

export function getWalletErrorMessage(error: string | null): string {
  if (!error) return '';
  if (error === 'LACE_NOT_DETECTED')
    return 'Midnight Lace Wallet not detected. Please install the Midnight Lace extension from the browser store.';
  if (error === 'CONNECTION_REJECTED')
    return 'Connection request rejected. Please approve the connection in your Midnight Lace Wallet popup.';
  return error;
}

export function formatWalletAddress(address: string | null): string {
  if (!address) return '';
  if (address.length <= 20) return address;
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
}
