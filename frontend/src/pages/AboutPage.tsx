import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Code,
  Layers,
  Cpu,
  Database,
  Globe,
  Award,
  BookOpen
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-network" style={{ marginBottom: '0.5rem' }}>Project Documentation</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>About Anonymous Clinical Trial Platform</h1>
        <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '720px', margin: '0.5rem auto 0 auto' }}>
          Built for the Midnight Hackathon. A decentralized confidential healthcare platform solving clinical trial data privacy using Zero-Knowledge proofs.
        </p>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} color="#e11d48" />
            The Clinical Trial Privacy Challenge
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
            Participant data in clinical trials is among the most sensitive personal health information (PHI). Conventional data collection models expose trial participants to identity disclosure, employer discrimination, and insurance penalties.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7 }}>
            Furthermore, public blockchains traditionally record all transactions transparently, making them unsuitable for medical trials without advanced Zero-Knowledge confidentiality layers.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#059669" />
            The Midnight Solution
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
            Our platform leverages Midnight Network's Compact smart contract language to achieve <strong>default-on privacy</strong>. Patients produce zero-knowledge witness proofs on their local devices.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7 }}>
            Only aggregated, non-identifiable statistics are disclosed on-chain, empowering medical researchers with tamper-proof data while guaranteeing 100% patient anonymity.
          </p>
        </div>
      </div>

      {/* Tech Stack Highlights */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
          Technical Stack & Architecture
        </h3>

        <div className="grid-4">
          <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Globe size={28} color="#4338ca" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Midnight Network</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Confidential blockchain protocol designed for privacy-preserving dApps.</p>
          </div>

          <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Code size={28} color="#0284c7" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Compact Language</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Midnight's ZK smart contract DSL with explicit <code>disclose(...)</code> semantics.</p>
          </div>

          <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Layers size={28} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>React 18 & Vite</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Modern multi-page SPA architecture built for high-performance healthcare UI.</p>
          </div>

          <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Cpu size={28} color="#d97706" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Proof Server & Docker</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Isolated ZK proof engine container executing client-side proving keys.</p>
          </div>
        </div>
      </div>

      {/* Hackathon Attribution Banner */}
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06), rgba(5, 150, 105, 0.06))' }}>
        <Award size={32} color="#4338ca" style={{ margin: '0 auto 0.75rem auto' }} />
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Midnight Hackathon Submission
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
          Designed and engineered as a showcase dApp demonstrating confidential healthcare data collection and regulatory-compliant clinical research on the Midnight Network.
        </p>
      </div>
    </div>
  );
};
