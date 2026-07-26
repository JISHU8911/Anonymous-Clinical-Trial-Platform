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
  X
} from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

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

          {isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '0.8rem',
                color: '#334155',
                background: '#f1f5f9',
                padding: '0.4rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1',
                fontWeight: 600,
                fontFamily: 'monospace'
              }}>
                {formatAddress(address || '')}
              </span>
              <button className="btn btn-secondary" onClick={onDisconnect} style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}>
                <LogOut size={14} />
                Disconnect
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onConnect} disabled={isConnecting} style={{ padding: '0.55rem 1rem' }}>
              {isConnecting ? <Loader2 size={16} className="spin" /> : <Wallet size={16} />}
              {isConnecting ? 'Connecting...' : 'Connect Lace Wallet'}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
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
          </div>
        </div>
      )}
    </nav>
  );
};
