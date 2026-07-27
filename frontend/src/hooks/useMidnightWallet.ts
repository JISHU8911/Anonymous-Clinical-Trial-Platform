import { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// Midnight Lace Wallet 4.0.1 — Dynamic Connector
//
// Features:
//   - Discovers providers via Object.values(window.midnight || {})
//   - Connects using provider.connect() or provider.enable() WITHOUT forcing network arguments
//   - Detects network dynamically from wallet response
//   - Provides detailed error handling for Network ID mismatch & connection rejections
//   - Stores provider name, RDNS, and API version for debugging
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
  providerRdns: string | null;
  apiVersion: string | null;
}

export interface LaceProvider {
  name?: string;
  rdns?: string;
  apiVersion?: string;
  icon?: string;
  connect?: () => Promise<LaceAPI>;
  enable?: () => Promise<LaceAPI>;
  isEnabled?: () => Promise<boolean>;
}

export interface LaceAPI {
  state?: (() => Promise<LaceWalletState> | { subscribe?: (fn: (state: LaceWalletState) => void) => unknown } | LaceWalletState) | LaceWalletState;
  serviceUriConfig?: () => Promise<unknown> | unknown;
  networkId?: string;
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
 * Supports Lace 4.0.1 API (provider.connect / provider.enable).
 */
function discoverLaceProvider(): LaceProvider | null {
  if (typeof window === 'undefined') return null;

  const rawMidnight = window.midnight || {};
  console.log('[Wallet Debug] window.midnight:', rawMidnight);

  const providers = Object.values(rawMidnight) as LaceProvider[];
  console.log('[Wallet Debug] Detected Providers:', providers);

  const laceProvider = providers.find(
    p =>
      p?.name?.toLowerCase() === 'lace' ||
      p?.rdns === 'io.lace.wallet' ||
      typeof p?.connect === 'function' ||
      typeof p?.enable === 'function'
  ) || null;

  console.log('[Wallet Debug] Selected Provider:', laceProvider);
  console.log('[Wallet Debug] Provider Name:', laceProvider?.name);
  console.log('[Wallet Debug] Provider RDNS:', laceProvider?.rdns);
  console.log('[Wallet Debug] Provider API Version:', laceProvider?.apiVersion);

  return laceProvider;
}

const SESSION_KEY = 'midnight-lace-connected';

/**
 * React hook for Midnight Lace Wallet integration.
 */
export function useMidnightWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    coinPublicKey: null,
    network: 'auto-detected',
    balance: null,
    error: null,
    laceDetected: false,
    providerName: null,
    providerRdns: null,
    apiVersion: null,
  });

  const connectRef = useRef<(() => Promise<void>) | null>(null);

  /**
   * Check presence of Lace Wallet provider and update state flags.
   */
  const checkLacePresence = useCallback(() => {
    const provider = discoverLaceProvider();
    const detected = !!provider;

    setWalletState((prev) => {
      if (
        prev.laceDetected === detected &&
        prev.providerName === (provider?.name || (detected ? 'Lace' : null)) &&
        prev.apiVersion === (provider?.apiVersion || null)
      ) {
        return prev;
      }
      return {
        ...prev,
        laceDetected: detected,
        providerName: provider?.name || (detected ? 'Lace' : null),
        providerRdns: provider?.rdns || (detected ? 'io.lace.wallet' : null),
        apiVersion: provider?.apiVersion || null,
        error: prev.error === 'LACE_NOT_DETECTED' && detected ? null : prev.error,
      };
    });
    return detected;
  }, []);

  /**
   * Connect to Midnight Lace Wallet using provider.connect() or provider.enable().
   * NO arguments are passed to avoid "Network ID mismatch" errors.
   */
  const connect = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = discoverLaceProvider();
      if (!provider) {
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          isConnected: false,
          address: null,
          coinPublicKey: null,
          balance: null,
          laceDetected: false,
          providerName: null,
          providerRdns: null,
          apiVersion: null,
          error: 'LACE_NOT_DETECTED',
        }));
        return;
      }

      // Connect without forcing any network parameter
      let api: LaceAPI;
      try {
        if (typeof provider.connect === 'function') {
          api = await provider.connect();
        } else if (typeof provider.enable === 'function') {
          api = await provider.enable();
        } else {
          throw new Error('Provider does not expose connect() or enable()');
        }
        console.log('[Wallet Debug] Connected API:', api);
      } catch (enableErr: unknown) {
        const msg = enableErr instanceof Error ? enableErr.message : String(enableErr);
        console.error('[Wallet Debug] Connection failed:', enableErr);
        const isRejection = /user rejected|denied|cancelled|cancel|refused/i.test(msg);
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          error: isRejection ? 'CONNECTION_REJECTED' : msg,
        }));
        return;
      }

      // Extract state from returned API
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
        console.warn('[Wallet Debug] Error extracting wallet state:', stateErr);
      }

      let walletAddress: string | null = null;
      let walletCoinPublicKey: string | null = null;
      let walletNetwork: string = 'preprod';
      let walletBalance: string | null = null;

      if (rawState) {
        console.log('[Wallet Debug] Extracted Wallet State:', rawState);
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
        } else if (api.networkId && typeof api.networkId === 'string') {
          walletNetwork = api.networkId;
        }

        if (rawState.balances && typeof rawState.balances === 'object') {
          const entries = Object.entries(rawState.balances);
          if (entries.length > 0) {
            walletBalance = `${entries[0][1]} tDust`;
          }
        }
      }

      console.log('[Wallet Debug] Wallet Address:', walletAddress);
      console.log('[Wallet Debug] Detected Network:', walletNetwork);

      // Persist session
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Ignored
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
        providerRdns: provider.rdns || 'io.lace.wallet',
        apiVersion: provider.apiVersion || '4.0.1',
      });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect Midnight Lace Wallet';
      console.error('[Wallet Debug] Unhandled Connect Error:', err);
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
      network: 'auto-detected',
      balance: null,
      error: null,
      laceDetected: prev.laceDetected,
      providerName: prev.providerName,
      providerRdns: prev.providerRdns,
      apiVersion: prev.apiVersion,
    }));
  }, []);

  /**
   * Reconnect automatically if previously authorized.
   */
  const reconnect = useCallback(async () => {
    const provider = discoverLaceProvider();
    if (!provider) return;

    try {
      const wasSessionConnected = sessionStorage.getItem(SESSION_KEY) === 'true';
      const isEnabled = typeof provider.isEnabled === 'function'
        ? await provider.isEnabled()
        : false;

      if ((wasSessionConnected || isEnabled) && connectRef.current) {
        await connectRef.current();
      }
    } catch {
      // Best effort reconnect
    }
  }, []);

  // Poll for async extension injection during initial mount
  useEffect(() => {
    checkLacePresence();

    const timer = setInterval(() => {
      const found = checkLacePresence();
      if (found) clearInterval(timer);
    }, 250);

    const timeout = setTimeout(() => clearInterval(timer), 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
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
  if (error.includes('Network ID mismatch'))
    return 'Network ID mismatch: The selected network in your Midnight Lace Wallet does not match the application. Please check your Lace Wallet network setting.';
  return error;
}

export function formatWalletAddress(address: string | null): string {
  if (!address) return '';
  if (address.length <= 20) return address;
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
}
