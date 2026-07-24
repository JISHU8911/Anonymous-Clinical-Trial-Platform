import React, { useState } from 'react';
import { Send, Lock, Loader2, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (rating: number, adverseEvent: boolean, patientSecret: string) => Promise<void>;
  isSubmitting: boolean;
  isConnected: boolean;
  isTrialActive: boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,
  isSubmitting,
  isConnected,
  isTrialActive,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [adverseEvent, setAdverseEvent] = useState<boolean>(false);
  const [patientSecret, setPatientSecret] = useState<string>(
    'patient-secret-' + Math.random().toString(36).substring(2, 10)
  );
  const [status, setStatus] = useState<{ type: 'idle' | 'proving' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !isTrialActive) return;

    setStatus({ type: 'proving', message: 'Generating Zero-Knowledge Proof locally (patient secret remains private)...' });
    try {
      await onSubmit(rating, adverseEvent, patientSecret);
      setStatus({ type: 'success', message: 'Anonymous feedback successfully proven & submitted to Midnight network!' });
      // Refresh patient secret for next submission
      setPatientSecret('patient-secret-' + Math.random().toString(36).substring(2, 10));
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || 'Failed to submit feedback' });
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <h3 className="card-title">
        <Lock size={20} color="#6366f1" />
        Anonymous Patient Feedback Form
      </h3>

      <div className="privacy-box">
        <h4><Lock size={16} /> Privacy Boundary Active</h4>
        <ul>
          <li>Your <b>Patient Secret</b> and exact rating choice stay strictly on your device.</li>
          <li>Midnight ZK Circuits prove your submission is valid without linking your identity.</li>
          <li>Only the aggregate ledger counters (Total Count, Rating Sum) are updated on-chain.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Efficacy & Satisfaction Rating (1 = Poor, 5 = Excellent)</label>
          <div className="rating-selector">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`rating-btn ${rating === num ? 'active' : ''}`}
                onClick={() => setRating(num)}
                disabled={isSubmitting || !isTrialActive}
              >
                ★ {num}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ margin: '1.5rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={adverseEvent}
              onChange={(e) => setAdverseEvent(e.target.checked)}
              disabled={isSubmitting || !isTrialActive}
              style={{ width: '18px', height: '18px', accentColor: '#f43f5e' }}
            />
            <span style={{ fontSize: '0.9rem', color: adverseEvent ? '#fb7185' : '#94a3b8' }}>
              <ShieldAlert size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Report Adverse Reaction / Side Effect (Confidential)
            </span>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Private Patient Secret Token (ZK Witness Key)</label>
          <input
            type="text"
            className="form-input"
            value={patientSecret}
            onChange={(e) => setPatientSecret(e.target.value)}
            disabled={isSubmitting || !isTrialActive}
            placeholder="Enter unique private patient token"
          />
          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
            Used inside ZK witness. Never broadcast to indexers or node RPCs.
          </span>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
          disabled={!isConnected || !isTrialActive || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spin" />
              Proving ZK Circuit & Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Anonymous Feedback
            </>
          )}
        </button>
      </form>

      {!isConnected && (
        <div className="status-panel status-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <AlertCircle size={16} />
          Please connect your Midnight Lace wallet above to submit feedback.
        </div>
      )}

      {!isTrialActive && isConnected && (
        <div className="status-panel status-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <AlertCircle size={16} />
          Clinical trial recruitment is currently paused by trial coordinator.
        </div>
      )}

      {status.type === 'proving' && (
        <div className="status-panel status-loading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Loader2 size={16} className="spin" />
          {status.message}
        </div>
      )}

      {status.type === 'success' && (
        <div className="status-panel status-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} />
          {status.message}
        </div>
      )}

      {status.type === 'error' && (
        <div className="status-panel status-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          {status.message}
        </div>
      )}
    </div>
  );
};
