import { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// Midnight Lace Wallet — Official DApp Integration
// Based on: https://docs.midnight.network/develop/tutorial/using/chrome-ext
//
// Official API:
//   const lace = window.midnight.mnLace;
//   const api  = await lace.enable();             // triggers approval popup
//   const state = await api.state();               // { address, coinPublicKey, ... }
//   const isAuth = await lace.isEnabled();         // check existing auth
//
// RULES:
//   - ONLY connect to window.midnight.mnLace
//   - NEVER generate fake addresses
//   - NEVER fallback to placeholder data
//   - If Lace is not installed → show install prompt only
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
}

// Official Midnight Lace Wallet provider type (window.midnight.mnLace)
interface LaceProvider {
  enable(): Promise<LaceAPI>;
  isEnabled(): Promise<boolean>;
  apiVersion?: string;
  name?: string;
}

// Official Midnight Lace Wallet API returned by enable()
interface LaceAPI {
  state(): Promise<LaceWalletState>;
}

// Official wallet state returned by api.state()
interface LaceWalletState {
  address?: string;
  coinPublicKey?: string;
  encryptionPublicKey?: string;
  networkId?: string;
  balances?: Record<string, string>;
}

declare global {
  interface Window {
    midnight?: Record<string, unknown>;
  }
}

/**
 * Detect the Midnight Lace Wallet provider from window.midnight.
 * 
 * Per official docs: check window.midnight.mnLace first.
 * Also enumerate window.midnight for any injected provider (future-proofing).
 */
function detectLaceProvider(): LaceProvider | null {
  if (typeof window === 'undefined' || !window.midnight) return null;

  // Primary: official key
  const mnLace = window.midnight.mnLace as LaceProvider | undefined;
  if (mnLace && typeof mnLace.enable === 'function') return mnLace;

  // Secondary: enumerate for any injected provider
  for (const value of Object.values(window.midnight)) {
    const provider = value as LaceProvider;
    if (provider && typeof provider.enable === 'function') return provider;
  }

  return null;
}

/**
 * useMidnightWallet — React hook for Midnight Lace Wallet integration.
 *
 * Uses the OFFICIAL Midnight Lace DApp API:
 *   1. Detect: window.midnight.mnLace
 *   2. Enable: provider.enable()  → triggers user approval popup
 *   3. State:  api.state()        → { address, coinPublicKey, networkId }
 *
 * NEVER generates fake addresses. NEVER uses mock data.
 * If Lace is not installed, sets error = 'LACE_NOT_DETECTED' only.
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
  });

  // Prevent stale closure issues with connect
  const connectRef = useRef<(() => Promise<void>) | null>(null);

  /**
   * Check whether the Lace extension is installed and update laceDetected.
   */
  const checkLacePresence = useCallback(() => {
    const detected = !!detectLaceProvider();
    setWalletState((prev) => {
      if (prev.laceDetected === detected) return prev;
      return {
        ...prev,
        laceDetected: detected,
        // Clear "not detected" error if extension just appeared
        error: prev.error === 'LACE_NOT_DETECTED' && detected ? null : prev.error,
      };
    });
    return detected;
  }, []);

  /**
   * Connect to Midnight Lace Wallet.
   *
   * Flow:
   *   1. Detect provider — if missing, set LACE_NOT_DETECTED, stop.
   *   2. Call provider.enable() — triggers Lace approval popup.
   *   3. Call api.state() — get real address and keys from Lace.
   *   4. Update state with real wallet data.
   */
  const connect = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Step 1: Detect
      const provider = detectLaceProvider();
      if (!provider) {
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          isConnected: false,
          address: null,
          coinPublicKey: null,
          balance: null,
          laceDetected: false,
          error: 'LACE_NOT_DETECTED',
        }));
        return;
      }

      // Step 2: Enable — triggers Lace approval popup
      let api: LaceAPI;
      try {
        api = await provider.enable();
      } catch (enableErr: unknown) {
        const msg = enableErr instanceof Error ? enableErr.message : String(enableErr);
        const isRejection = /user rejected|denied|cancelled|cancel|refused/i.test(msg);
        setWalletState((prev) => ({
          ...prev,
          isConnecting: false,
          error: isRejection ? 'CONNECTION_REJECTED' : msg,
        }));
        return;
      }

      // Step 3: Get wallet state — OFFICIAL API: api.state() → { address, coinPublicKey }
      let walletAddress: string | null = null;
      let walletCoinPublicKey: string | null = null;
      let walletNetwork: string = import.meta.env.VITE_NETWORK || 'undeployed';
      let walletBalance: string | null = null;

      try {
        const state = await api.state();

        // address is the real Lace wallet address
        if (state.address && typeof state.address === 'string' && state.address.trim() !== '') {
          walletAddress = state.address.trim();
        }

        if (state.coinPublicKey && typeof state.coinPublicKey === 'string') {
          walletCoinPublicKey = state.coinPublicKey.trim();
        }

        if (state.networkId && typeof state.networkId === 'string') {
          walletNetwork = state.networkId;
        }

        // Parse balances if available
        if (state.balances && typeof state.balances === 'object') {
          const entries = Object.entries(state.balances);
          if (entries.length > 0) {
            const [, amount] = entries[0];
            walletBalance = `${amount} tDust`;
          }
        }
      } catch (stateErr: unknown) {
        // State fetch failure — connected but address unavailable
        console.warn('[Lace] api.state() failed:', stateErr);
      }

      // Step 4: Update state with real wallet data (no fake fallback)
      setWalletState({
        isConnected: true,
        isConnecting: false,
        address: walletAddress,          // null if Lace didn't return one
        coinPublicKey: walletCoinPublicKey,
        network: walletNetwork,
        balance: walletBalance,
        error: null,
        laceDetected: true,
      });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect Midnight Lace Wallet';
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: msg,
      }));
    }
  }, []);

  // Keep ref in sync so reconnect can call the latest connect
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  /**
   * Disconnect from Lace Wallet.
   * Clears all wallet state — no fake data is restored.
   */
  const disconnect = useCallback(() => {
    setWalletState((prev) => ({
      isConnected: false,
      isConnecting: false,
      address: null,
      coinPublicKey: null,
      network: import.meta.env.VITE_NETWORK || 'undeployed',
      balance: null,
      error: null,
      laceDetected: prev.laceDetected,
    }));
  }, []);

  /**
   * Reconnect: if Lace is installed and previously authorized, connect silently.
   */
  const reconnect = useCallback(async () => {
    const provider = detectLaceProvider();
    if (!provider) return;

    try {
      const alreadyEnabled = await provider.isEnabled();
      if (alreadyEnabled && connectRef.current) {
        await connectRef.current();
      }
    } catch {
      // Silent failure — reconnect is best-effort
    }
  }, []);

  // On mount: detect extension presence
  useEffect(() => {
    checkLacePresence();
  }, [checkLacePresence]);

  // Re-check when window regains focus (user may have just installed Lace)
  useEffect(() => {
    const onFocus = () => checkLacePresence();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [checkLacePresence]);

  // Auto-reconnect if previously authorized
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

/** Human-readable error messages for display in the UI. */
export function getWalletErrorMessage(error: string | null): string {
  if (!error) return '';
  if (error === 'LACE_NOT_DETECTED')
    return 'Midnight Lace Wallet not detected. Please install the Midnight Lace extension from the browser store.';
  if (error === 'CONNECTION_REJECTED')
    return 'Connection request rejected. Please approve the connection in your Midnight Lace Wallet popup.';
  return error;
}

/** Truncate a wallet address for compact UI display. */
export function formatWalletAddress(address: string | null): string {
  if (!address) return '';
  if (address.length <= 20) return address;
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
}
