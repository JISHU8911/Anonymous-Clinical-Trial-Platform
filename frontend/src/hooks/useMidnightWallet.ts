import { useState, useEffect, useCallback } from 'react';

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  network: string;
  balance: string | null;
  error: string | null;
}

export function useMidnightWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    network: import.meta.env.VITE_NETWORK || 'undeployed',
    balance: null,
    error: null,
  });

  const connect = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      // Check for Midnight Lace Wallet browser extension
      const midnightAPI = (window as any).midnight?.mnLace;

      if (!midnightAPI) {
        // Mock connection mode for local testing if extension is not installed
        setWalletState({
          isConnected: true,
          isConnecting: false,
          address: 'mn_addr_undeployed1h3ssm5ru2t6eqy4g3she78zlxn96e36ms6pq996aduvmateh9p9sk96u7s',
          network: import.meta.env.VITE_NETWORK || 'undeployed',
          balance: '250,000,000 tNight',
          error: null,
        });
        return;
      }

      const wallet = await midnightAPI.enable();
      const state = await wallet.state();
      const address = wallet.getUnshieldedAddress ? await wallet.getUnshieldedAddress() : 'mn_addr_lace_connected';

      setWalletState({
        isConnected: true,
        isConnecting: false,
        address: address.toString(),
        network: import.meta.env.VITE_NETWORK || 'undeployed',
        balance: state?.balance ? `${state.balance} tNight` : 'Synced',
        error: null,
      });
    } catch (err: any) {
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: err?.message || 'Failed to connect Midnight Lace Wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      isConnecting: false,
      address: null,
      network: import.meta.env.VITE_NETWORK || 'undeployed',
      balance: null,
      error: null,
    });
  }, []);

  useEffect(() => {
    // Auto-check connection status on load
    if ((window as any).midnight?.mnLace?.isEnabled) {
      connect();
    }
  }, [connect]);

  return {
    ...walletState,
    connect,
    disconnect,
  };
}
