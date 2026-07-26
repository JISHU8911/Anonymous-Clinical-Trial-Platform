import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  FileCheck,
  AlertTriangle,
  Star,
  RefreshCw,
  Send,
  Sliders,
  BarChart3,
  Lock,
  Globe,
  ShieldCheck,
  Cpu,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { LedgerState } from '../components/TrialDashboard';

interface DashboardPageProps {
  ledger: LedgerState;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
  isConnected: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  ledger,
  onRefresh,
  isLoading,
  isConnected,
}) => {
  const totalResp = Number(ledger.totalResponses);
  const ratingSum = Number(ledger.ratingSum);
  const adverseCount = Number(ledger.adverseEventCount);

  const avgRating = totalResp > 0 ? (ratingSum / totalResp).toFixed(2) : '0.00';
  const adverseRate = totalResp > 0 ? ((adverseCount / totalResp) * 100).toFixed(1) : '0.0';

  const recentActivity = [
    {
      id: 1,
      type: 'New Anonymous Submission',
      detail: `Trial #${ledger.trialId} received ZK proof feedback with rating 5/5`,
      time: '2 mins ago',
      status: 'Verified',
    },
    {
      id: 2,
      type: 'Satisfaction Score Update',
      detail: `Average efficacy score updated to ${avgRating} / 5.00`,
      time: '15 mins ago',
      status: 'Updated',
    },
    {
      id: 3,
      type: 'Adverse Event Recorded',
      detail: `Anonymous adverse reaction flag count updated to ${adverseCount}`,
      time: '1 hour ago',
      status: 'On-Chain',
    },
    {
      id: 4,
      type: 'Trial Statistics Updated',
      detail: `Public ledger disclosures synced for Protocol #${ledger.trialId}`,
      time: '3 hours ago',
      status: 'Synced',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Title & Refresh */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-network" style={{ marginBottom: '0.4rem' }}>Clinical Research Workspace</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Executive Trial Dashboard</h1>
        </div>

        <button className="btn btn-secondary" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
          {isLoading ? 'Refreshing State...' : 'Sync Public Ledger'}
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid-4">
        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Clinical Trial ID</span>
            <FileCheck size={20} color="#4f46e5" />
          </div>
          <div className="stat-value" style={{ color: '#4338ca' }}>
            #{ledger.trialId.toString()}
          </div>
          <div className="stat-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className={`badge ${ledger.isTrialActive ? 'badge-active' : 'badge-paused'}`}>
              {ledger.isTrialActive ? 'Recruiting Active' : 'Recruitment Paused'}
            </span>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Anonymous Responses</span>
            <Activity size={20} color="#0284c7" />
          </div>
          <div className="stat-value" style={{ color: '#0284c7' }}>
            {ledger.totalResponses.toString()}
          </div>
          <div className="stat-footer">
            Verified ZK Patient Proofs
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Avg Satisfaction Score</span>
            <Star size={20} color="#d97706" />
          </div>
          <div className="stat-value" style={{ color: '#d97706' }}>
            {avgRating} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ 5.0</span>
          </div>
          <div className="stat-footer">
            Cumulative Rating Sum: {ledger.ratingSum.toString()}
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span>Adverse Reaction Rate</span>
            <AlertTriangle size={20} color="#e11d48" />
          </div>
          <div className="stat-value" style={{ color: '#e11d48' }}>
            {adverseRate}%
          </div>
          <div className="stat-footer">
            Total Flagged Events: {ledger.adverseEventCount.toString()}
          </div>
        </div>
      </div>

      {/* Main Content Split: Network Status & Quick Actions */}
      <div className="grid-2">
        {/* Network & Infrastructure Health */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 className="card-title">
            <Globe size={20} color="#4338ca" />
            Infrastructure & Network Status
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(5, 150, 105, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="#059669" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Midnight Network</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Testnet Node Operational</div>
                </div>
              </div>
              <span className="badge badge-active">CONNECTED</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(79, 70, 229, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileCheck size={20} color="#4f46e5" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Compact Smart Contract</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>
                    {ledger.contractAddress.slice(0, 14)}...{ledger.contractAddress.slice(-8)}
                  </div>
                </div>
              </div>
              <span className="badge badge-network">DEPLOYED</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(2, 132, 199, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Cpu size={20} color="#0284c7" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Proof Server Engine</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Docker Proof Server (6300)</div>
                </div>
              </div>
              <span className="badge badge-active">READY</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Navigation */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 className="card-title">
            <Sliders size={20} color="#0284c7" />
            Quick Workspace Actions
          </h3>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <NavLink to="/submit" className="btn btn-primary" style={{ padding: '1.25rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Send size={18} />
                <span style={{ fontWeight: 700 }}>Submit Response</span>
              </div>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 400 }}>Patient portal step wizard</span>
            </NavLink>

            <NavLink to="/admin" className="btn btn-secondary" style={{ padding: '1.25rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Sliders size={18} color="#4338ca" />
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Trial Admin</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>Pause or initialize protocols</span>
            </NavLink>

            <NavLink to="/analytics" className="btn btn-secondary" style={{ padding: '1.25rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <BarChart3 size={18} color="#059669" />
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Analytics Hub</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>View charts & outcome metrics</span>
            </NavLink>

            <NavLink to="/privacy" className="btn btn-secondary" style={{ padding: '1.25rem', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Lock size={18} color="#d97706" />
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Privacy Explorer</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>Compact privacy model guide</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Timeline Feed: Recent Activity */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 className="card-title">
          <Clock size={20} color="#059669" />
          Recent Trial Activity Feed
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {recentActivity.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <CheckCircle2 size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{item.type}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>{item.detail}</p>
              </div>
              <span className="badge badge-active">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
