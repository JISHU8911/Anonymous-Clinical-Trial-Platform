import React, { useState } from 'react';
import { Settings, Play, Pause, Loader2, CheckCircle2 } from 'lucide-react';

interface AdminPanelProps {
  isTrialActive: boolean;
  onToggleStatus: () => Promise<void>;
  onInitializeTrial: (trialId: number) => Promise<void>;
  isSubmitting: boolean;
  isConnected: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isTrialActive,
  onToggleStatus,
  onInitializeTrial,
  isSubmitting,
  isConnected,
}) => {
  const [newTrialId, setNewTrialId] = useState<string>('202');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleInit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(newTrialId, 10);
    if (isNaN(id)) return;
    setStatusMsg('Submitting Initialize Trial ZK Circuit...');
    try {
      await onInitializeTrial(id);
      setStatusMsg(`Trial #${id} initialized successfully!`);
    } catch (err: any) {
      setStatusMsg(`Initialization error: ${err?.message || 'Failed'}`);
    }
  };

  const handleToggle = async () => {
    setStatusMsg('Toggling Trial Recruitment Status...');
    try {
      await onToggleStatus();
      setStatusMsg(`Trial status updated!`);
    } catch (err: any) {
      setStatusMsg(`Error: ${err?.message || 'Failed'}`);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <h3 className="card-title">
        <Settings size={20} color="#4338ca" />
        Clinical Trial Investigator Controls
      </h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.75rem' }}>
          Current Recruitment Status: <b style={{ color: isTrialActive ? '#047857' : '#b45309' }}>{isTrialActive ? 'ACTIVE' : 'PAUSED'}</b>
        </p>
        <button
          className="btn btn-secondary"
          onClick={handleToggle}
          disabled={!isConnected || isSubmitting}
          style={{ width: '100%' }}
        >
          {isSubmitting ? <Loader2 size={16} className="spin" /> : isTrialActive ? <Pause size={16} color="#d97706" /> : <Play size={16} color="#059669" />}
          {isTrialActive ? 'Pause Trial Recruitment' : 'Resume Trial Recruitment'}
        </button>
      </div>

      <hr style={{ borderColor: 'rgba(226, 232, 240, 0.8)', margin: '1.5rem 0' }} />

      <form onSubmit={handleInit}>
        <div className="form-group">
          <label className="form-label">Initialize New Clinical Protocol ID</label>
          <input
            type="number"
            className="form-input"
            value={newTrialId}
            onChange={(e) => setNewTrialId(e.target.value)}
            disabled={!isConnected || isSubmitting}
            placeholder="Protocol ID (e.g. 202)"
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ width: '100%' }}
          disabled={!isConnected || isSubmitting}
        >
          {isSubmitting ? <Loader2 size={16} className="spin" /> : <CheckCircle2 size={16} color="#0284c7" />}
          Initialize Protocol #{newTrialId}
        </button>
      </form>

      {statusMsg && (
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#4338ca', textAlign: 'center', fontWeight: 500 }}>
          {statusMsg}
        </div>
      )}
    </div>
  );
};
