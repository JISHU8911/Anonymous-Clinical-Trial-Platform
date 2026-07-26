import React, { useState } from 'react';
import {
  Send,
  Lock,
  Star,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Key,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

interface PatientPortalPageProps {
  onSubmit: (rating: number, adverseEvent: boolean, patientSecret: string) => Promise<void>;
  isSubmitting: boolean;
  isConnected: boolean;
  isTrialActive: boolean;
}

export const PatientPortalPage: React.FC<PatientPortalPageProps> = ({
  onSubmit,
  isSubmitting,
  isConnected,
  isTrialActive,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rating, setRating] = useState<number>(5);
  const [adverseEvent, setAdverseEvent] = useState<boolean>(false);
  const [patientSecret, setPatientSecret] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const steps = [
    { num: 1, label: 'Witness Secret' },
    { num: 2, label: 'Trial Protocol' },
    { num: 3, label: 'Efficacy Rating' },
    { num: 4, label: 'Adverse Reaction' },
    { num: 5, label: 'Generate ZK Proof' },
    { num: 6, label: 'Submit On-Chain' },
  ];

  const generateRandomSecret = () => {
    const randomHex = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setPatientSecret(`0x${randomHex}`);
  };

  const handleFinalSubmit = async () => {
    setStatusMessage('Generating Zero-Knowledge Proof & Submitting to Compact Circuit...');
    try {
      await onSubmit(rating, adverseEvent, patientSecret);
      setSubmitted(true);
      setStatusMessage('ZK Feedback Proof verified & submitted successfully on Midnight Network!');
    } catch (err: any) {
      setStatusMessage(`Submission Error: ${err?.message || 'Verification Failed'}`);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setRating(5);
    setAdverseEvent(false);
    setPatientSecret('');
    setStatusMessage(null);
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-network" style={{ marginBottom: '0.5rem' }}>Patient Privacy Portal</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>Anonymous Trial Feedback Submission</h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
          Step-by-step zero-knowledge wizard. Your rating and identity are kept 100% confidential in client-side ZK witnesses.
        </p>
      </div>

      {/* Wizard Step Progress Bar */}
      <div className="wizard-steps">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num || submitted;
          return (
            <div key={step.num} className={`wizard-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="wizard-step-circle">
                {isCompleted ? <CheckCircle2 size={18} /> : step.num}
              </div>
              <span className="wizard-step-label">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Warning if Wallet Disconnected or Trial Paused */}
      {!isConnected && (
        <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#b45309', fontSize: '0.9rem', fontWeight: 500 }}>
          <AlertTriangle size={20} />
          Please connect your Midnight Lace Wallet in the header before submitting trial responses.
        </div>
      )}

      {!isTrialActive && (
        <div style={{ padding: '1rem', background: 'rgba(225, 29, 72, 0.1)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e11d48', fontSize: '0.9rem', fontWeight: 500 }}>
          <AlertTriangle size={20} />
          Trial recruitment is currently PAUSED by the clinical investigator. Submissions are temporarily disabled.
        </div>
      )}

      {/* Wizard Card Body */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Submission Verified & Recorded!
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#475569', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Your zero-knowledge proof has been successfully submitted. Public aggregate counters on the Midnight ledger have been updated without exposing your identity.
            </p>

            <button className="btn btn-primary" onClick={resetForm}>
              Submit Another Response
            </button>
          </div>
        ) : (
          <>
            {/* Step 1: Patient Secret */}
            {currentStep === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Key size={22} color="#4338ca" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 1: Patient Anonymous Witness Secret</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Generate or provide your 256-bit client-side secret token.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Client Private Witness Secret Token</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={patientSecret}
                      onChange={(e) => setPatientSecret(e.target.value)}
                      placeholder="0x4a8f9c2d1e... (Leave blank or generate)"
                      style={{ fontFamily: 'monospace' }}
                    />
                    <button type="button" className="btn btn-secondary" onClick={generateRandomSecret} style={{ flexShrink: 0 }}>
                      Generate Secret
                    </button>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem', display: 'block' }}>
                    🔒 This secret stays local on your machine and is never transmitted to the network.
                  </span>
                </div>
              </div>
            )}

            {/* Step 2: Protocol Selection */}
            {currentStep === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <FileSpreadsheet size={22} color="#0284c7" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 2: Clinical Trial Protocol Response</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Select the active protocol ID you are participating in.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Active Clinical Trial Protocol ID</label>
                  <select className="form-select" disabled value="101">
                    <option value="101">Protocol #101 — Phase II Multi-Center Clinical Trial</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Satisfaction Rating */}
            {currentStep === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Star size={22} color="#d97706" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 3: Treatment Efficacy & Satisfaction Rating</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Rate your treatment outcome from 1 (Poor) to 5 (Excellent).</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Efficacy Score (Scale 1 to 5)</label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`rating-btn ${rating === val ? 'active' : ''}`}
                        onClick={() => setRating(val)}
                      >
                        {val} {val === 5 ? '★' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Adverse Reaction Report */}
            {currentStep === 4 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <AlertTriangle size={22} color="#e11d48" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 4: Adverse Reaction Report</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Report if you experienced any adverse side effects during the trial.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Did you experience an adverse reaction?</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      className={`btn ${!adverseEvent ? 'btn-emerald' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '1rem' }}
                      onClick={() => setAdverseEvent(false)}
                    >
                      No Adverse Reaction
                    </button>
                    <button
                      type="button"
                      className={`btn ${adverseEvent ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '1rem', background: adverseEvent ? '#e11d48' : '' }}
                      onClick={() => setAdverseEvent(true)}
                    >
                      Report Adverse Event
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: ZK Proof Generation */}
            {currentStep === 5 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Cpu size={22} color="#7c3aed" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 5: Client ZK Proof Generation Overview</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Review parameters before constructing local ZK proof.</p>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Selected Rating:</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{rating} / 5</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Adverse Event Reported:</span>
                    <span style={{ fontWeight: 700, color: adverseEvent ? '#e11d48' : '#059669' }}>
                      {adverseEvent ? 'YES (Flag = 1)' : 'NO (Flag = 0)'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#64748b' }}>Witness Secret Token:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#4338ca' }}>
                      {patientSecret ? `${patientSecret.slice(0, 10)}...` : 'Generated on-the-fly'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Submit Verification */}
            {currentStep === 6 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <ShieldCheck size={22} color="#059669" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Step 6: Submit Verification to Midnight Ledger</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Execute `submitFeedback` circuit on-chain.</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(5, 150, 105, 0.06)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#047857' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>✅ Compact Verification Guarantee</p>
                  By clicking Submit, your local browser generates a ZK proof for circuit <code>submitFeedback(patientSecret, rating, adverseEventFlag)</code> and updates public ledger counters automatically.
                </div>
              </div>
            )}

            {/* Status Feedback Message */}
            {statusMessage && (
              <div className="status-panel status-loading" style={{ marginBottom: '1.5rem' }}>
                <Loader2 size={16} className="spin" style={{ display: 'inline', marginRight: '0.5rem' }} />
                {statusMessage}
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div />}

              {currentStep < 6 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={!isConnected || !isTrialActive}
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-emerald"
                  onClick={handleFinalSubmit}
                  disabled={!isConnected || !isTrialActive || isSubmitting}
                >
                  {isSubmitting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                  Submit ZK Verification
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
