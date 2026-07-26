import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Brand Info */}
          <div>
            <div className="brand-title" style={{ marginBottom: '1rem' }}>
              <ShieldCheck size={26} color="#4f46e5" />
              <span>Anonymous Clinical Trial</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              Zero-knowledge confidential clinical trial feedback platform empowering patient privacy on the Midnight Network.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <NavLink to="/dashboard" style={{ color: '#475569', textDecoration: 'none' }}>Trial Dashboard</NavLink>
              <NavLink to="/submit" style={{ color: '#475569', textDecoration: 'none' }}>Patient Submission Portal</NavLink>
              <NavLink to="/admin" style={{ color: '#475569', textDecoration: 'none' }}>Trial Admin Panel</NavLink>
              <NavLink to="/analytics" style={{ color: '#475569', textDecoration: 'none' }}>Research Analytics</NavLink>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <NavLink to="/privacy" style={{ color: '#475569', textDecoration: 'none' }}>Privacy Architecture</NavLink>
              <NavLink to="/history" style={{ color: '#475569', textDecoration: 'none' }}>Audit Trail & History</NavLink>
              <a href="https://github.com/JISHU8911/Anonymous-Clinical-Trial-Platform" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Github size={14} /> GitHub Repository
              </a>
              <a href="https://midnight.network" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ExternalLink size={14} /> Midnight Docs
              </a>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Technology</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="badge badge-network">Midnight Network</span>
              <span className="badge badge-network" style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', borderColor: 'rgba(2, 132, 199, 0.3)' }}>Compact Language</span>
              <span className="badge badge-network" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', borderColor: 'rgba(5, 150, 105, 0.3)' }}>React 18</span>
              <span className="badge badge-network">TypeScript</span>
              <span className="badge badge-network">Vite</span>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(226, 232, 240, 0.8)', margin: '1.5rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          <div>
            © 2026 Anonymous Clinical Trial Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#4338ca' }}>
            Built with <Heart size={14} color="#e11d48" fill="#e11d48" /> for Midnight Hackathon — Anonymous Clinical Trial Platform
          </div>
        </div>
      </div>
    </footer>
  );
};
