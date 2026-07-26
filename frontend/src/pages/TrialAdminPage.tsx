import React, { useState } from 'react';
import {
  Sliders,
  Play,
  Pause,
  CheckCircle2,
  Loader2,
  FileCheck,
  AlertCircle,
  Users,
  BarChart2,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { LedgerState } from '../components/TrialDashboard';

interface TrialAdminPageProps {
  ledger: LedgerState;
  onToggleStatus: () => Promise<void>;
  onInitializeTrial: (trialId: number) => Promise<void>;
  isSubmitting: boolean;
  isConnected: boolean;
}

export const TrialAdminPage: React.FC<TrialAdminPageProps> = ({
  ledger,
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
    setStatusMsg(`Executing initializeTrial(${id}) Compact circuit on Midnight...`);
    try {
      await onInitializeTrial(id);
      setStatusMsg(`Trial Protocol #${id} initialized successfully!`);
    } catch (err: any) {
      setStatusMsg(`Initialization error: ${err?.message || 'Failed'}`);
    }
  };

  const handleToggle = async () => {
    setStatusMsg('Executing toggleTrialStatus() Compact circuit...');
    try {
      await onToggleStatus();
      setStatusMsg(`Trial recruitment status updated!`);
    } catch (err: any) {
      setStatusMsg(`Error: ${err?.message || 'Failed'}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header */}
      <div>
        <span className="badge badge-network" style={{ marginBottom: '0.4rem' }}>Investigator Workspace</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Clinical Trial Administration</h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
          Configure protocol parameters, pause/resume recruitment, and view aggregate trial health metrics.
        </p>
      </div>

      {/* Main Grid: Controls & Stats */}
      <div className="grid-2">
        {/* Trial Configuration Controls */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 className="card-title">
            <Sliders size={22} color="#4338ca" />
            Recruitment & Status Controls
          </h3>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Active Protocol ID:</span>
              <span style={{ fontWeight: 800, color: '#4338ca', fontSize: '1.1rem' }}>#{ledger.trialId.toString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Recruitment Status:</span>
              <span className={`badge ${ledger.isTrialActive ? 'badge-active' : 'badge-paused'}`}>
                {ledger.isTrialActive ? 'RECRUITING ACTIVE' : 'RECRUITMENT PAUSED'}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>Toggle Trial State</label>
            <button
              className="btn btn-secondary"
              onClick={handleToggle}
              disabled={!isConnected || isSubmitting}
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {isSubmitting ? (
                <Loader2 size={18} className="spin" />
              ) : ledger.isTrialActive ? (
                <Pause size={18} color="#d97706" />
              ) : (
                <Play size={18} color="#059669" />
              )}
              {ledger.isTrialActive ? 'Pause Recruitment Circuit' : 'Resume Recruitment Circuit'}
            </button>
          </div>

          <hr style={{ borderColor: 'rgba(226, 232, 240, 0.8)', margin: '1.5rem 0' }} />

          <form onSubmit={handleInit}>
            <div className="form-group">
              <label className="form-label">Initialize New Protocol ID</label>
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
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
              disabled={!isConnected || isSubmitting}
            >
              {isSubmitting ? <Loader2 size={18} className="spin" /> : <CheckCircle2 size={18} />}
              Initialize Protocol #{newTrialId}
            </button>
          </form>

          {statusMsg && (
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(79, 70, 229, 0.08)', borderRadius: '0.5rem', color: '#4338ca', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600 }}>
              {statusMsg}
            </div>
          )}
        </div>

        {/* Aggregate Metrics Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 className="card-title">
            <BarChart2 size={22} color="#0284c7" />
            Public Aggregate Participation Metrics
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Total Verified Submissions</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{ledger.totalResponses.toString()}</div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Cumulative Efficacy Rating Sum</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{ledger.ratingSum.toString()}</div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Adverse Reaction Count</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{ledger.adverseEventCount.toString()}</div>
              </div>
            </div>

            {/* Privacy Compliance Banner */}
            <div style={{ padding: '1rem', background: 'rgba(2, 132, 199, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(2, 132, 199, 0.2)', fontSize: '0.8rem', color: '#0284c7', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Lock size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <b>Strict Privacy Enforcement:</b> Only public aggregate metrics are exposed. Patient identity, wallet keys, and individual rating values remain strictly non-disclosed in zero-knowledge witness circuits.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
