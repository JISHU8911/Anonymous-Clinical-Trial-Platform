import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LedgerState } from './components/TrialDashboard';
import { WalletDebugPanel } from './components/WalletDebugPanel';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PatientPortalPage } from './pages/PatientPortalPage';
import { TrialAdminPage } from './pages/TrialAdminPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PrivacyModelPage } from './pages/PrivacyModelPage';
import { ResearchHistoryPage } from './pages/ResearchHistoryPage';
import { AboutPage } from './pages/AboutPage';

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
    <div className="app-wrapper">
      <Navbar
        isConnected={wallet.isConnected}
        isConnecting={wallet.isConnecting}
        address={wallet.address}
        network={wallet.network}
        error={wallet.error}
        laceDetected={wallet.laceDetected}
        onConnect={wallet.connect}
        onDisconnect={wallet.disconnect}
      />

      <main className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                ledger={ledger}
                onRefresh={fetchLedgerState}
                isLoading={isLoadingLedger}
                isConnected={wallet.isConnected}
              />
            }
          />
          <Route
            path="/submit"
            element={
              <PatientPortalPage
                onSubmit={handleSubmitFeedback}
                isSubmitting={isSubmitting}
                isConnected={wallet.isConnected}
                isTrialActive={ledger.isTrialActive}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <TrialAdminPage
                ledger={ledger}
                onToggleStatus={handleToggleTrialStatus}
                onInitializeTrial={handleInitializeTrial}
                isSubmitting={isSubmitting}
                isConnected={wallet.isConnected}
              />
            }
          />
          <Route path="/analytics" element={<AnalyticsPage ledger={ledger} />} />
          <Route path="/privacy" element={<PrivacyModelPage />} />
          <Route path="/history" element={<ResearchHistoryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Lace 4.0.1 Debug Panel */}
      <WalletDebugPanel wallet={wallet} />
    </div>
  );
}

export default App;
