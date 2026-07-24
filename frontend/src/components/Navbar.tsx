import React from 'react';
import { ShieldCheck, Wallet, LogOut, Loader2, Globe } from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  network: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  isConnecting,
  address,
  network,
  onConnect,
  onDisconnect,
}) => {
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <nav className="glass-panel navbar">
      <div className="brand-title">
        <ShieldCheck size={28} color="#4f46e5" />
        <div>
          <span>Anonymous Clinical Trial Platform</span>
          <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
            Midnight Zero-Knowledge Protocol
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="badge badge-network">
          <Globe size={12} />
          {network}
        </div>

        {isConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#334155', background: '#f1f5f9', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontWeight: 500 }}>
              {formatAddress(address || '')}
            </span>
            <button className="btn btn-secondary" onClick={onDisconnect} title="Disconnect Wallet">
              <LogOut size={16} />
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={onConnect} disabled={isConnecting}>
            {isConnecting ? <Loader2 size={16} className="spin" /> : <Wallet size={16} />}
            {isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};
