import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { TrialDashboard, LedgerState } from './components/TrialDashboard';
import { FeedbackForm } from './components/FeedbackForm';
import { AdminPanel } from './components/AdminPanel';
import { PrivacyBanner } from './components/PrivacyBanner';
import { useMidnightWallet } from './hooks/useMidnightWallet';

export function App() {
  const wallet = useMidnightWallet();

  const [ledger, setLedger] = useState<LedgerState>({
    trialId: 101n,
    totalResponses: 24n,
    adverseEventCount: 2n,
    ratingSum: 112n, // avg = 4.67
    isTrialActive: true,
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || 'dec3b071d373ec575648e0c5dfee659710312616875db1fb6cd84a06c7cc6dd2',
  });

  const [isLoadingLedger, setIsLoadingLedger] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchLedgerState = useCallback(async () => {
    setIsLoadingLedger(true);
    try {
      // Fetch public ledger state from indexer GraphQL if configured, or use live state
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || ledger.contractAddress;
      setLedger((prev) => ({
        ...prev,
        contractAddress,
      }));
    } catch (err) {
      console.error('Error fetching ledger state:', err);
    } finally {
      setIsLoadingLedger(false);
    }
  }, [ledger.contractAddress]);

  useEffect(() => {
    fetchLedgerState();
  }, [fetchLedgerState]);

  const handleSubmitFeedback = async (rating: number, adverseEvent: boolean, _patientSecret: string) => {
    setIsSubmitting(true);
    try {
      // Simulate ZK proof generation delay (1.5s)
      await new Promise((r) => setTimeout(r, 1500));

      // Update local ledger view
      setLedger((prev) => ({
        ...prev,
        totalResponses: prev.totalResponses + 1n,
        ratingSum: prev.ratingSum + BigInt(rating),
        adverseEventCount: adverseEvent ? prev.adverseEventCount + 1n : prev.adverseEventCount,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTrialStatus = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setLedger((prev) => ({
        ...prev,
        isTrialActive: !prev.isTrialActive,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInitializeTrial = async (trialId: number) => {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setLedger((prev) => ({
        ...prev,
        trialId: BigInt(trialId),
        totalResponses: 0n,
        ratingSum: 0n,
        adverseEventCount: 0n,
        isTrialActive: true,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        isConnected={wallet.isConnected}
        isConnecting={wallet.isConnecting}
        address={wallet.address}
        network={wallet.network}
        onConnect={wallet.connect}
        onDisconnect={wallet.disconnect}
      />

      <PrivacyBanner />

      <TrialDashboard
        ledger={ledger}
        onRefresh={fetchLedgerState}
        isLoading={isLoadingLedger}
      />

      <div className="content-grid">
        <FeedbackForm
          onSubmit={handleSubmitFeedback}
          isSubmitting={isSubmitting}
          isConnected={wallet.isConnected}
          isTrialActive={ledger.isTrialActive}
        />

        <AdminPanel
          isTrialActive={ledger.isTrialActive}
          onToggleStatus={handleToggleTrialStatus}
          onInitializeTrial={handleInitializeTrial}
          isSubmitting={isSubmitting}
          isConnected={wallet.isConnected}
        />
      </div>

      <footer className="glass-panel" style={{ textAlign: 'center', padding: '1.25rem', color: '#64748b', fontSize: '0.8rem' }}>
        Anonymous Clinical Trial Platform • Built on Midnight Network (Zero-Knowledge Compact Smart Contracts)
      </footer>
    </div>
  );
}

export default App;
