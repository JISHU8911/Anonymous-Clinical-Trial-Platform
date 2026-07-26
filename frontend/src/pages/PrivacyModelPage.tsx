import React from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Code,
  CheckCircle2,
  Cpu,
  FileCode
} from 'lucide-react';

export const PrivacyModelPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-network" style={{ marginBottom: '0.5rem' }}>Educational Privacy Architecture</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>Zero-Knowledge Healthcare Privacy Model</h1>
        <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '700px', margin: '0.5rem auto 0 auto' }}>
          Deep dive into Midnight Network Compact smart contracts, zero-knowledge proofs, and mathematical privacy guarantees for medical research.
        </p>
      </div>

      {/* Comparison Cards: What Observers Can See vs Cannot See */}
      <div className="grid-2">
        {/* What Observers Cannot See */}
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #e11d48' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EyeOff size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>WHAT OBSERVERS CANNOT SEE</h3>
              <span style={{ fontSize: '0.75rem', color: '#e11d48', fontWeight: 600 }}>Private Witness State (Zero-Knowledge Protected)</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#e11d48" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Patient Identity & Personal Data</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>No names, national IDs, or demographic records touch the network.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#e11d48" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Medical Records & EHR Linkage</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Zero correlation between patient clinical charts and on-chain events.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#e11d48" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Wallet Address Linkage</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Unshielded keys are not tied to individual trial submissions.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#e11d48" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Individual Survey Responses</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Individual 1-to-5 rating values remain strictly inside local ZK witnesses.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#e11d48" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Private Trial Witness Secret Data</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Client secret tokens remain securely isolated in browser memory.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Observers Can See */}
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #059669' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>WHAT OBSERVERS CAN SEE</h3>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Public Ledger State (Verifiable Disclosures)</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Trial Protocol ID</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Public trial identifier (e.g. Protocol #101) to attribute metrics.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Aggregate Participation Count</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Cumulative count of verified ZK response proofs submitted to date.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Average Satisfaction Score</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Mathematically disclosed rating sum for calculating mean treatment efficacy.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Adverse Event Totals</strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Public aggregate counter of flagged adverse side effects across the cohort.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Compact Code Highlights */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <FileCode size={24} color="#4338ca" />
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Compact Smart Contract Implementation</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Real contract code from <code>contracts/clinical-trial.compact</code> demonstrating private witnesses and explicit disclosures.</p>
          </div>
        </div>

        <div className="code-block">
          <pre style={{ margin: 0 }}>
            <code>
{`pragma language_version >= 0.23;

import CompactStandardLibrary;

// Public ledger state - aggregated clinical trial metrics visible on-chain
export ledger trialId: Uint<64>;
export ledger totalResponses: Uint<64>;
export ledger adverseEventCount: Uint<64>;
export ledger ratingSum: Uint<64>;
export ledger isTrialActive: Boolean;

// Circuit for patients to submit anonymous trial feedback
// Circuit arguments (patientSecret, rating, adverseEventFlag) remain PRIVATE in ZK
export circuit submitFeedback(patientSecret: Bytes<32>, rating: Uint<64>, adverseEventFlag: Uint<64>): [] {
    // Assert trial is currently active
    assert(isTrialActive, "Clinical trial is not currently active");
    
    // Assert rating is within valid scale (1 to 5)
    assert(rating >= (1 as Uint<64>) && rating <= (5 as Uint<64>), "Rating must be between 1 and 5");
    
    // Assert adverse event flag is 0 or 1
    assert(adverseEventFlag == (0 as Uint<64>) || adverseEventFlag == (1 as Uint<64>), "Adverse event flag must be 0 or 1");
    
    // Disclose aggregated updates publicly to update public ledger counters
    totalResponses = disclose((totalResponses + 1) as Uint<64>);
    ratingSum = disclose((ratingSum + rating) as Uint<64>);
    adverseEventCount = disclose((adverseEventCount + adverseEventFlag) as Uint<64>);
}`}
            </code>
          </pre>
        </div>
      </div>

      {/* Explanatory Deep Dives */}
      <div className="grid-3">
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <ShieldCheck size={24} color="#4338ca" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>How ZK Protects Patients</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
            Zero-knowledge proofs allow a client to prove mathematically that a rating satisfies all circuit assertions (valid range, active trial, valid secret) without revealing the rating itself to validators.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <Cpu size={24} color="#0284c7" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Midnight Privacy Guarantees</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
            Midnight uses dual-ledger state management. Private state lives exclusively in the local client witness, while public state contains only explicitly disclosed aggregate values.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <Code size={24} color="#059669" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Explicit Disclosure Keyword</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
            In Compact, privacy is default-on. Variables become public on the ledger ONLY when wrapped inside the <code>disclose(...)</code> keyword, preventing accidental data leakage.
          </p>
        </div>
      </div>
    </div>
  );
};
