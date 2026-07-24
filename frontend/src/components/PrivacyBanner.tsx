import React from 'react';
import { ShieldCheck, Eye, EyeOff, CheckCircle } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <h3 className="card-title" style={{ color: '#38bdf8' }}>
        <ShieldCheck size={22} color="#38bdf8" />
        Midnight ZK Privacy Architecture & Claim
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '1.25rem', borderRadius: '0.75rem' }}>
          <h4 style={{ color: '#fb7185', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <EyeOff size={18} />
            What Observers Cannot Learn (Private Witness)
          </h4>
          <ul style={{ fontSize: '0.85rem', color: '#94a3b8', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>• Patient identity, wallet keys, or secret tokens.</li>
            <li>• Individual rating submitted by any specific patient.</li>
            <li>• Whether a specific patient reported an adverse reaction.</li>
            <li>• Correlation between patient medical records and on-chain activity.</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '0.75rem' }}>
          <h4 style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Eye size={18} />
            What Observers Can Learn (Public Ledger State)
          </h4>
          <ul style={{ fontSize: '0.85rem', color: '#94a3b8', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>• Clinical Trial Protocol ID (e.g. #101).</li>
            <li>• Total aggregate response submission count.</li>
            <li>• Cumulative rating sum & average efficacy score.</li>
            <li>• Aggregate count of reported adverse reactions.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.85rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CheckCircle size={20} style={{ flexShrink: 0 }} />
        <span>
          <b>Explicit Disclosure Guarantee:</b> In Compact smart contracts, data is private by default. The <code>disclose(...)</code> keyword is invoked deliberately only for public aggregate metrics, proving patient eligibility in ZK without side-channel leaks.
        </span>
      </div>
    </div>
  );
};
