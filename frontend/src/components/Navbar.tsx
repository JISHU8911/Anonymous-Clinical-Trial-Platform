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
        <ShieldCheck size={28} color="#6366f1" />
        <div>
          <span>Anonymous Clinical Trial Platform</span>
          <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 400 }}>
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
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
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
