import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  Wallet,
  LogOut,
  Loader2,
  Globe,
  Home,
  LayoutDashboard,
  Send,
  Sliders,
  BarChart3,
  Lock,
  History,
  Info,
  Menu,
  X,
  AlertTriangle,
  ExternalLink,
  CircleCheck,
} from 'lucide-react';

interface NavbarProps {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  network: string;
  error?: string | null;
  laceDetected?: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  isConnecting,
  address,
  network,
  error,
  laceDetected = false,
  onConnect,
  onDisconnect,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showErrorTooltip, setShowErrorTooltip] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const laceInstallUrl = 'https://docs.midnight.network/develop/tutorial/using/chrome-ext';

  // Resolve human-readable error label
  const errorLabel =
    error === 'LACE_NOT_DETECTED'
      ? 'Midnight Lace Wallet not detected. Please install the Midnight Lace extension.'
      : error === 'CONNECTION_REJECTED'
      ? 'Connection rejected. Please approve the request in your Lace Wallet popup.'
      : error || null;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/submit', label: 'Submit Trial', icon: Send },
    { to: '/admin', label: 'Trial Admin', icon: Sliders },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/privacy', label: 'Privacy', icon: Lock },
    { to: '/history', label: 'History', icon: History },
    { to: '/about', label: 'About', icon: Info },
  ];

  return (
    <>
      <nav className="sticky-nav">
        <div className="nav-content">
          {/* Brand */}
          <NavLink to="/" className="brand-title">
            <ShieldCheck size={28} color="#4f46e5" />
            <div>
              <span>Anonymous Clinical Trial</span>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.02em' }}>
                Midnight Zero-Knowledge Protocol
              </div>
            </div>
          </NavLink>

          {/* Desktop Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <Icon size={16} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Wallet & Network Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="badge badge-network" title="Midnight Network ID">
              <Globe size={12} />
              {network}
            </div>

            {/* Wallet connection area */}
            {isConnected ? (
              /* ── CONNECTED STATE ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CircleCheck size={12} color="#059669" />
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#334155',
                    background: '#f1f5f9',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}>
                    {address ? formatAddress(address) : 'Lace Connected'}
                  </span>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={onDisconnect}
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                  title="Disconnect Midnight Lace Wallet"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            ) : error === 'LACE_NOT_DETECTED' ? (
              /* ── LACE NOT INSTALLED ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(234,179,8,0.1)',
                    border: '1px solid rgba(234,179,8,0.4)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setShowErrorTooltip(true)}
                  onMouseLeave={() => setShowErrorTooltip(false)}
                >
                  <AlertTriangle size={14} color="#eab308" />
                  <span style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 600 }}>
                    Lace Not Installed
                  </span>

                  {/* Tooltip */}
                  {showErrorTooltip && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '280px',
                      background: '#1e293b',
                      border: '1px solid rgba(234,179,8,0.3)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      zIndex: 1000,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    }}>
                      <div style={{ color: '#fde047', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                        Midnight Lace Wallet Required
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        Install the Midnight Lace browser extension to connect your wallet and participate in anonymous clinical trials.
                      </div>
                      <a
                        href={laceInstallUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          color: '#60a5fa',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <ExternalLink size={12} />
                        Install Midnight Lace Extension
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href={laceInstallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1rem', textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <ExternalLink size={14} />
                  Install Lace
                </a>
              </div>
            ) : error && error !== 'LACE_NOT_DETECTED' ? (
              /* ── OTHER ERROR (e.g. user rejected) ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  color: '#ef4444',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.5rem',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                  title={errorLabel || ''}
                >
                  <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {error === 'CONNECTION_REJECTED' ? 'Connection rejected' : 'Connection error'}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={onConnect}
                  disabled={isConnecting}
                  style={{ padding: '0.55rem 1rem' }}
                >
                  {isConnecting ? <Loader2 size={16} className="spin" /> : <Wallet size={16} />}
                  Retry
                </button>
              </div>
            ) : (
              /* ── DEFAULT: NOT CONNECTED ── */
              <button
                className="btn btn-primary"
                onClick={onConnect}
                disabled={isConnecting}
                style={{ padding: '0.55rem 1rem' }}
                title="Connect Midnight Lace Wallet"
              >
                {isConnecting ? <Loader2 size={16} className="spin" /> : <Wallet size={16} />}
                {isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
            <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700, color: '#4338ca' }}>Navigation Menu</span>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    style={{ padding: '0.75rem 1rem', fontSize: '1rem' }}
                  >
                    <Icon size={18} />
                    {link.label}
                  </NavLink>
                );
              })}

              {/* Mobile wallet status */}
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                {isConnected ? (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CircleCheck size={14} /> Lace Wallet Connected
                    </div>
                    {address && (
                      <code style={{ fontSize: '0.75rem', color: '#475569', display: 'block', marginBottom: '0.75rem' }}>
                        {formatAddress(address)}
                      </code>
                    )}
                    <button className="btn btn-secondary" onClick={onDisconnect} style={{ width: '100%', fontSize: '0.85rem' }}>
                      <LogOut size={14} /> Disconnect
                    </button>
                  </div>
                ) : error === 'LACE_NOT_DETECTED' ? (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertTriangle size={14} /> Lace Wallet Not Installed
                    </div>
                    <a
                      href={laceInstallUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%', textDecoration: 'none', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      <ExternalLink size={14} /> Install Midnight Lace
                    </a>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={onConnect}
                    disabled={isConnecting}
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    {isConnecting ? <Loader2 size={14} className="spin" /> : <Wallet size={14} />}
                    {isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Full-width banner: Lace not detected */}
      {error === 'LACE_NOT_DETECTED' && !isConnected && (
        <div style={{
          background: 'linear-gradient(90deg, #78350f, #92400e)',
          borderBottom: '1px solid #d97706',
          padding: '0.6rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fde68a', fontSize: '0.85rem', fontWeight: 500 }}>
            <AlertTriangle size={15} />
            Midnight Lace Wallet not detected. Please install the browser extension to connect your wallet.
          </div>
          <a
            href={laceInstallUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '0.4rem',
              color: '#fef3c7',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <ExternalLink size={13} />
            Install Midnight Lace Extension
          </a>
        </div>
      )}
    </>
  );
};

