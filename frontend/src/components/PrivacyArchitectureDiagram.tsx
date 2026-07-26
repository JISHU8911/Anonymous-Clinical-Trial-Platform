import React from 'react';
import { UserCheck, Key, FileCheck, ShieldCheck, Database, ArrowRight } from 'lucide-react';

export const PrivacyArchitectureDiagram: React.FC = () => {
  const steps = [
    {
      icon: UserCheck,
      title: 'Patient Device',
      subtitle: 'Local Client',
      desc: 'Patient enters trial response & private secret token locally in browser.',
      color: '#4338ca',
      bgColor: 'rgba(99, 102, 241, 0.08)',
      borderColor: 'rgba(99, 102, 241, 0.25)',
      badge: 'Private Witness',
    },
    {
      icon: Key,
      title: 'Private Witness',
      subtitle: 'ZK Proof Generation',
      desc: 'Zero-knowledge proof is generated locally without exposing patient identity.',
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.08)',
      borderColor: 'rgba(2, 132, 199, 0.25)',
      badge: 'Zero-Knowledge',
    },
    {
      icon: FileCheck,
      title: 'Compact Contract',
      subtitle: 'Circuit Verification',
      desc: 'Compact smart contract verifies assertions & computes aggregate state updates.',
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.08)',
      borderColor: 'rgba(5, 150, 105, 0.25)',
      badge: 'Circuit Validation',
    },
    {
      icon: ShieldCheck,
      title: 'Midnight Ledger',
      subtitle: 'Confidential Chain',
      desc: 'Updates public aggregate counters (rating sum & adverse event count) on ledger.',
      color: '#d97706',
      bgColor: 'rgba(217, 119, 6, 0.08)',
      borderColor: 'rgba(217, 119, 6, 0.25)',
      badge: 'Disclosed Metrics',
    },
    {
      icon: Database,
      title: 'Aggregate Metrics',
      subtitle: 'Public Dashboard',
      desc: 'Researchers receive verified aggregate trial analytics with 100% patient anonymity.',
      color: '#7c3aed',
      bgColor: 'rgba(124, 58, 237, 0.08)',
      borderColor: 'rgba(124, 58, 237, 0.25)',
      badge: 'Research Insights',
    },
  ];

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-network" style={{ marginBottom: '0.5rem' }}>Healthcare Privacy Architecture</span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Zero-Knowledge Confidential Data Flow</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
          How patient data moves safely from a local client device to the public Midnight Network ledger while guaranteeing mathematical privacy.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.title}>
              <div style={{
                flex: '1 1 200px',
                minWidth: '200px',
                maxWidth: '240px',
                background: step.bgColor,
                border: `1px solid ${step.borderColor}`,
                borderRadius: '1rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.75rem',
                    background: step.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${step.bgColor}`
                  }}>
                    <Icon size={20} />
                  </div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.4rem',
                    background: '#ffffff',
                    color: step.color,
                    border: `1px solid ${step.borderColor}`
                  }}>
                    {step.badge}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{step.title}</h4>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: step.color }}>{step.subtitle}</div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  <ArrowRight size={20} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
