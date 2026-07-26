import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  EyeOff,
  Activity,
  FileSpreadsheet,
  Building2,
  Stethoscope,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Shield,
  Layers,
  Cpu,
  Database
} from 'lucide-react';
import { PrivacyArchitectureDiagram } from '../components/PrivacyArchitectureDiagram';

export const LandingPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(79, 70, 229, 0.1)', color: '#4338ca', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', border: '1px solid rgba(79, 70, 229, 0.25)' }}>
          <Sparkles size={16} /> Powered by Midnight Network Zero-Knowledge Proofs
        </div>

        <h1 className="hero-title">
          Anonymous Clinical Trial Verification Powered by Zero-Knowledge Privacy
        </h1>

        <p className="hero-subtitle">
          Enable patients to contribute clinical trial feedback and outcomes without exposing their identities, medical records, wallet information, or personal health data.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <NavLink to="/submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
            Launch Trial Portal
            <ArrowRight size={18} />
          </NavLink>
          <NavLink to="/privacy" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
            <Lock size={18} color="#0284c7" />
            Learn How It Works
          </NavLink>
        </div>

        {/* Hero Privacy Architecture Illustration */}
        <PrivacyArchitectureDiagram />
      </section>

      {/* Problem & Solution Deep Dive Section */}
      <section className="grid-2">
        <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid #e11d48' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48' }}>
              <EyeOff size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a' }}>Why Traditional Clinical Research Fails Privacy</h3>
          </div>
          <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
            Traditional clinical trial data collection forces participants to surrender intimate medical records and personal identity vectors. This creates immense privacy risks:
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#475569', listStyle: 'none' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#e11d48', fontWeight: 700 }}>•</span> Data breaches expose confidential patient health histories to unauthorized entities.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#e11d48', fontWeight: 700 }}>•</span> Stigmatization prevents patients from reporting honest adverse drug reactions.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#e11d48', fontWeight: 700 }}>•</span> Blockchain ledgers traditionally expose public wallet addresses and transaction graphs.
            </li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid #059669' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.6rem', borderRadius: '0.5rem', background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a' }}>The Midnight Zero-Knowledge Solution</h3>
          </div>
          <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
            The Anonymous Clinical Trial Platform decouples patient identity from clinical feedback using Midnight Network Compact smart contracts:
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#475569', listStyle: 'none' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              Patients generate local ZK proofs of valid participation without revealing their keys.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              Only aggregate statistics (totals, satisfaction sums, adverse counts) are disclosed.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              Researchers obtain verified, tamper-proof trial data while patients remain 100% anonymous.
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-network">Key Advantages</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
            Enterprise Healthcare Privacy Benefits
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Designed for clinical researchers, pharmaceutical sponsors, and patient protection.
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Shield size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Anonymous Patient Participation</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Patients contribute treatment efficacy and adverse reaction feedback without fear of identity leaks or medical data exposure.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Cpu size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Zero-Knowledge Verification</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              ZK witness circuits validate that feedback originates from a valid trial participant without revealing patient credentials.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Activity size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Privacy-Preserving Research</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Enables real-world data collection and longitudinal post-market drug surveillance with full patient privacy safeguards.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <FileSpreadsheet size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Regulatory Friendly</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Aligns with HIPAA, GDPR, and medical ethics requirements by minimizing personally identifiable health information (PHI).
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Lock size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Secure Medical Data Handling</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Client-side witness generation ensures raw medical ratings and secret keys never leave the participant's device.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '0.75rem', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Database size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>On-Chain Transparency</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Public ledger state records immutable, tamper-proof aggregate response counts and efficacy scores for public auditing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Step Flow */}
      <section className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-network">Execution Protocol</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
            How It Works in 4 Steps
          </h2>
        </div>

        <div className="grid-4">
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4338ca', marginBottom: '0.75rem' }}>01</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Anonymous Submission</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Patient selects trial protocol ID, inputs efficacy rating (1 to 5), and reports adverse event status.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.75rem' }}>02</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>ZK Witness Generation</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              The client browser constructs a private witness containing secret keys and rating values.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', marginBottom: '0.75rem' }}>03</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Compact Validation</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Compact circuit verifies `isTrialActive` assertions and updates public disclosures securely.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', marginBottom: '0.75rem' }}>04</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Aggregated Statistics</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Public Midnight ledger updates total response counters and satisfaction averages in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-network">Industry Use Cases</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
            Built for Healthcare & Research Institutions
          </h2>
        </div>

        <div className="grid-3">
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Building2 size={24} color="#4338ca" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Pharmaceutical Research</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Accelerate drug development with real-world anonymous patient feedback.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Layers size={24} color="#0284c7" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Clinical Trial Organizations</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Conduct global Phase I-IV trials with automated ZK compliance.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Stethoscope size={24} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Hospitals & Clinics</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Gather patient outcome feedback without violating medical privacy policies.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <GraduationCap size={24} color="#d97706" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Medical Universities</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Empower academic medical research with verifiable public dataset metrics.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Activity size={24} color="#7c3aed" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Healthcare Researchers</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Analyze unbiased efficacy trends across diverse patient demographics.</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <ShieldCheck size={24} color="#e11d48" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Public Health Agencies</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Monitor post-vaccination safety signals while keeping citizen identity private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large CTA Section */}
      <section className="glass-panel" style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(2, 132, 199, 0.08) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.2)'
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
          Launch Anonymous Clinical Trial Workspace
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
          Experience zero-knowledge privacy in action. Connect your Midnight Lace Wallet and start managing clinical trial data on-chain.
        </p>
        <NavLink to="/dashboard" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
          Go To Dashboard
          <ArrowRight size={20} />
        </NavLink>
      </section>
    </div>
  );
};
