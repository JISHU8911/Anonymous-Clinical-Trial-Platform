import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Cpu, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { WalletState } from '../hooks/useMidnightWallet';

interface WalletDebugPanelProps {
  wallet: WalletState;
}

export const WalletDebugPanel: React.FC<WalletDebugPanelProps> = ({ wallet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '0.8rem',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.85rem',
          background: wallet.isConnected ? '#064e3b' : wallet.laceDetected ? '#1e1b4b' : '#451a03',
          color: wallet.isConnected ? '#6ee7b7' : wallet.laceDetected ? '#a5f3fc' : '#fde047',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: isOpen ? '0.75rem 0.75rem 0 0' : '0.75rem',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          fontWeight: 600,
        }}
      >
        <Terminal size={14} />
        <span>Lace 4.0.1 Debug</span>
        {wallet.isConnected ? (
          <CheckCircle size={13} color="#34d399" />
        ) : wallet.laceDetected ? (
          <Cpu size={13} color="#38bdf8" />
        ) : (
          <AlertTriangle size={13} color="#facc15" />
        )}
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {isOpen && (
        <div style={{
          width: '320px',
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid rgba(255,255,255,0.2)',
          borderTop: 'none',
          borderRadius: '0 0 0.75rem 0.75rem',
          padding: '1rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}>
          <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={14} />
            Midnight Wallet Diagnostics
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>Status: </span>
            <span style={{ color: wallet.isConnected ? '#34d399' : wallet.isConnecting ? '#facc15' : '#f87171', fontWeight: 700 }}>
              {wallet.isConnected ? 'Connected' : wallet.isConnecting ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>Provider Name: </span>
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{wallet.providerName || 'N/A'}</span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>RDNS: </span>
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{wallet.providerRdns || 'N/A'}</span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>API Version: </span>
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{wallet.apiVersion || 'N/A'}</span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>Requested Network: </span>
            <span style={{ color: '#fcd34d', fontWeight: 700 }}>{wallet.requestedNetwork}</span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>Connected Network: </span>
            <span style={{ color: '#a5f3fc', fontWeight: 700 }}>{wallet.network}</span>
          </div>

          <div>
            <span style={{ color: '#94a3b8' }}>Wallet Address: </span>
            <code style={{ color: wallet.address ? '#34d399' : '#94a3b8', fontSize: '0.75rem', display: 'block', wordBreak: 'break-all', marginTop: '0.2rem', background: '#1e293b', padding: '0.3rem 0.5rem', borderRadius: '0.25rem' }}>
              {wallet.address || 'None'}
            </code>
          </div>

          {wallet.error && (
            <div style={{ marginTop: '0.4rem', padding: '0.5rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.4rem', color: '#fca5a5', fontSize: '0.75rem' }}>
              ⚠️ {wallet.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
