import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AuditRecord {
  id: string;
  submissionId: string;
  txHash: string;
  verificationEvent: string;
  trialId: number;
  timestamp: string;
  status: 'Verified' | 'Completed' | 'On-Chain';
}

export const ResearchHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');
  const [sortAsc, setSortAsc] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialRecords: AuditRecord[] = [
    {
      id: '1',
      submissionId: 'SUB-2026-9041',
      txHash: '0x3a8f9c2d1e4b7a0f8c5d2e9a1b4c7f0e3a6d9b2c5e8f1a4b7c0d3e6f9a2b5c8',
      verificationEvent: 'submitFeedback() ZK Proof',
      trialId: 101,
      timestamp: '2026-07-26 19:30:15',
      status: 'Verified',
    },
    {
      id: '2',
      submissionId: 'SUB-2026-9040',
      txHash: '0x7b1c4e7f0a3d6b9c2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1',
      verificationEvent: 'submitFeedback() ZK Proof',
      trialId: 101,
      timestamp: '2026-07-26 18:45:02',
      status: 'Verified',
    },
    {
      id: '3',
      submissionId: 'SUB-2026-9039',
      txHash: '0x9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2',
      verificationEvent: 'toggleTrialStatus() Circuit',
      trialId: 101,
      timestamp: '2026-07-26 16:12:44',
      status: 'On-Chain',
    },
    {
      id: '4',
      submissionId: 'SUB-2026-9038',
      txHash: '0x1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4',
      verificationEvent: 'initializeTrial() Protocol #101',
      trialId: 101,
      timestamp: '2026-07-26 12:00:00',
      status: 'Completed',
    },
  ];

  const handleCopy = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = initialRecords
    .filter((rec) => {
      const matchesSearch =
        rec.submissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.verificationEvent.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterEvent === 'All' || rec.status === filterEvent;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      return sortAsc
        ? a.timestamp.localeCompare(b.timestamp)
        : b.timestamp.localeCompare(a.timestamp);
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <span className="badge badge-network" style={{ marginBottom: '0.4rem' }}>On-Chain Verification Audit</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Research Audit & Event History</h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
          Search and verify zero-knowledge proof verification events submitted to the Midnight Network ledger.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '0.6rem', padding: '0.5rem 0.85rem', flex: '1 1 300px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search by Submission ID, Tx Hash, or Event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontFamily: 'inherit' }}
          />
        </div>

        {/* Filter & Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#64748b" />
            <select
              className="form-select"
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', width: 'auto' }}
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Completed">Completed</option>
              <option value="On-Chain">On-Chain</option>
            </select>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => setSortAsc(!sortAsc)}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
          >
            <ArrowUpDown size={14} />
            Sort: {sortAsc ? 'Oldest First' : 'Newest First'}
          </button>
        </div>
      </div>

      {/* Table Panel */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '1rem 1.25rem' }}>Submission ID</th>
                <th style={{ padding: '1rem 1.25rem' }}>Verification Event</th>
                <th style={{ padding: '1rem 1.25rem' }}>Trial ID</th>
                <th style={{ padding: '1rem 1.25rem' }}>Tx Hash</th>
                <th style={{ padding: '1rem 1.25rem' }}>Timestamp</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s ease' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#4338ca', fontFamily: 'monospace' }}>
                    {record.submissionId}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: '#0f172a', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} color="#059669" />
                      {record.verificationEvent}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: '#64748b' }}>
                    #{record.trialId}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#334155' }}>
                        {record.txHash.slice(0, 10)}...{record.txHash.slice(-8)}
                      </span>
                      <button
                        onClick={() => handleCopy(record.txHash, record.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedId === record.id ? '#059669' : '#94a3b8' }}
                        title="Copy Tx Hash"
                      >
                        {copiedId === record.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.8rem' }}>
                    {record.timestamp}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle2 size={12} /> {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
