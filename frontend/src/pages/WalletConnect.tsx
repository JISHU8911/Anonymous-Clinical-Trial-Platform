import React from 'react';
import { Wallet, ShieldCheck, AlertTriangle, ExternalLink, Loader2, LogOut, Globe, RotateCcw } from 'lucide-react';
import { useMidnightWallet, getWalletErrorMessage, formatWalletAddress } from '../hooks/useMidnightWallet';

/**
 * WalletConnect page — integrates ONLY with Midnight Lace Wallet.
 * 
 * This component NEVER generates fake addresses or uses mock wallets.
 * If the Midnight Lace extension is not installed, it shows an installation prompt.
 */
function WalletConnect() {
  const wallet = useMidnightWallet();

  const laceInstallUrl = 'https://docs.midnight.network/develop/tutorial/using/chrome-ext';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 0 32px rgba(79,70,229,0.5)',
          }}>
            <Wallet size={36} color="white" />
          </div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            Midnight Lace Wallet
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
            Connect your Midnight Lace browser extension to participate anonymously in clinical trials
          </p>
        </div>

        {/* Status Panel */}
        {!wallet.laceDetected && !wallet.isConnected && (
          <div style={{
            background: 'rgba(234,179,8,0.1)',
            border: '1px solid rgba(234,179,8,0.3)',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <AlertTriangle size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ color: '#fde047', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  Midnight Lace Wallet Not Detected
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  The Midnight Lace browser extension is required to connect. Please install it to continue.
                </div>
              </div>
            </div>
            <a
              href={laceInstallUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                padding: '0.6rem 1rem',
                background: 'rgba(234,179,8,0.15)',
                border: '1px solid rgba(234,179,8,0.3)',
                borderRadius: '0.5rem',
                color: '#fde047',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                width: 'fit-content',
              }}
            >
              <ExternalLink size={14} />
              Install Midnight Lace Wallet
            </a>
          </div>
        )}

        {/* Error display */}
        {wallet.error && wallet.error !== 'LACE_NOT_DETECTED' && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            color: '#fca5a5',
            fontSize: '0.85rem',
          }}>
            <AlertTriangle size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            {getWalletErrorMessage(wallet.error)}
          </div>
        )}

        {/* Connected State */}
        {wallet.isConnected && (
          <div style={{
            background: 'rgba(5,150,105,0.1)',
            border: '1px solid rgba(5,150,105,0.3)',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldCheck size={20} color="#34d399" />
              <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem' }}>
                Midnight Lace Connected
              </span>
            </div>

            {wallet.address && (
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  Wallet Address
                </div>
                <code style={{
                  color: '#a5f3fc',
                  fontSize: '0.82rem',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.5rem',
                  display: 'block',
                  wordBreak: 'break-all',
                  lineHeight: 1.5,
                }}>
                  {wallet.address}
                </code>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {wallet.network && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                  <Globe size={13} />
                  {wallet.network}
                </div>
              )}
              {wallet.balance && (
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                  Balance: <span style={{ color: '#a5f3fc', fontWeight: 600 }}>{wallet.balance}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!wallet.isConnected ? (
            <button
              onClick={wallet.connect}
              disabled={wallet.isConnecting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.5rem',
                background: wallet.laceDetected
                  ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                  : 'rgba(100,116,139,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: wallet.isConnecting ? 'not-allowed' : 'pointer',
                opacity: wallet.isConnecting ? 0.7 : 1,
                transition: 'all 0.2s ease',
                width: '100%',
              }}
            >
              {wallet.isConnecting ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Connecting to Lace Wallet...
                </>
              ) : (
                <>
                  <Wallet size={18} />
                  {wallet.laceDetected ? 'Connect Midnight Lace Wallet' : 'Install Lace Wallet to Connect'}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={wallet.disconnect}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.5rem',
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.75rem',
                color: '#fca5a5',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <LogOut size={18} />
              Disconnect Wallet
            </button>
          )}

          {!wallet.isConnected && wallet.laceDetected && (
            <button
              onClick={wallet.reconnect}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '0.75rem',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <RotateCcw size={15} />
              Try Reconnecting
            </button>
          )}
        </div>

        {/* Privacy note */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(79,70,229,0.06)',
          border: '1px solid rgba(79,70,229,0.15)',
          borderRadius: '0.75rem',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.78rem',
          lineHeight: 1.6,
          textAlign: 'center',
        }}>
          🔒 Your wallet address is never linked to submitted trial data. All responses are submitted anonymously via Zero-Knowledge proofs.
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;

