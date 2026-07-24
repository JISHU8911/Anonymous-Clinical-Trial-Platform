import React from 'react';
import { Activity, Users, Star, AlertTriangle, Hash, CheckCircle2, PauseCircle } from 'lucide-react';

export interface LedgerState {
  trialId: bigint;
  totalResponses: bigint;
  adverseEventCount: bigint;
  ratingSum: bigint;
  isTrialActive: boolean;
  contractAddress: string;
}

interface TrialDashboardProps {
  ledger: LedgerState;
  onRefresh: () => void;
  isLoading: boolean;
}

export const TrialDashboard: React.FC<TrialDashboardProps> = ({ ledger, onRefresh, isLoading }) => {
  const avgRating = ledger.totalResponses > 0n
    ? (Number(ledger.ratingSum) / Number(ledger.totalResponses)).toFixed(2)
    : '0.00';

  const adverseRate = ledger.totalResponses > 0n
    ? ((Number(ledger.adverseEventCount) / Number(ledger.totalResponses)) * 100).toFixed(1)
    : '0.0';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ margin: 0 }}>
          <Activity size={22} color="#0284c7" />
          Clinical Trial Ledger Dashboard
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className={ledger.isTrialActive ? "badge badge-active" : "badge badge-paused"}>
            {ledger.isTrialActive ? <CheckCircle2 size={12} /> : <PauseCircle size={12} />}
            {ledger.isTrialActive ? "ACTIVE RECRUITMENT" : "PAUSED"}
          </div>
          <button className="btn btn-secondary" onClick={onRefresh} disabled={isLoading} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            {isLoading ? 'Syncing...' : 'Refresh Ledger'}
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Protocol Trial ID</span>
            <Hash size={18} color="#4f46e5" />
          </div>
          <div className="stat-value" style={{ color: '#4f46e5' }}>
            #{ledger.trialId.toString()}
          </div>
          <div className="stat-footer">On-chain Registered Clinical Trial</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Anonymous Responses</span>
            <Users size={18} color="#059669" />
          </div>
          <div className="stat-value" style={{ color: '#059669' }}>
            {ledger.totalResponses.toString()}
          </div>
          <div className="stat-footer">Total Patient Submissions Verified by ZK</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Avg Satisfaction Score</span>
            <Star size={18} color="#d97706" />
          </div>
          <div className="stat-value" style={{ color: '#d97706' }}>
            {avgRating} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 5.0</span>
          </div>
          <div className="stat-footer">Cumulative Score: {ledger.ratingSum.toString()} pts</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Adverse Reaction Rate</span>
            <AlertTriangle size={18} color="#e11d48" />
          </div>
          <div className="stat-value" style={{ color: '#e11d48' }}>
            {adverseRate}%
          </div>
          <div className="stat-footer">{ledger.adverseEventCount.toString()} Adverse Events Reported</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <span>Contract Address: <code style={{ color: '#0284c7', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>{ledger.contractAddress}</code></span>
        <span>Public Ledger State: Synchronized</span>
      </div>
    </div>
  );
};
