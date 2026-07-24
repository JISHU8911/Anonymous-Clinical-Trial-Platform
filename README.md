# Anonymous Clinical Trial Platform (Midnight Network dApp)

A full-stack zero-knowledge decentralised application built on the **Midnight Network**, satisfying **Level 1**, **Level 2**, and **Level 3** project requirements for the **Anonymous Feedback / Survey** category.

---

## 💡 Product Proposal & Vision

### Problem
Clinical trials depend heavily on patient self-reported outcomes (PROs), side effect tracking, and satisfaction ratings. However, patients frequently hesitate to report sensitive symptoms or adverse reactions due to privacy fears, potential employer discrimination, or re-identification risks when trial data is processed or published.

### Solution
The **Anonymous Clinical Trial Platform** leverages Midnight Network's Compact zero-knowledge smart contracts to allow patients to submit verified feedback and adverse event reports anonymously. 

- **Private Patient Witnesses:** Patient identity secret tokens, exact numerical ratings (1-5), and private symptom notes are processed strictly inside local ZK circuits.
- **Verifiable Aggregated Public Ledger:** The blockchain ledger publicly maintains verified aggregate trial statistics (Total Responses, Average Efficacy Score, Adverse Event Count, Protocol Active Status) without ever disclosing individual patient choices or identities.

---

## 🔒 Privacy Model & Security Boundaries

Midnight contracts enforce privacy by default using zero-knowledge proofs. Data is only revealed publicly when the explicit `disclose(...)` operator is intentionally invoked in Compact code.

| Layer | Information | Privacy / Disclosure Status |
| :--- | :--- | :--- |
| **Private Witness** | Patient Secret Key | **NEVER DISCLOSED** — Kept on patient local device |
| **Private Witness** | Individual Rating Choice (1-5) | **NEVER DISCLOSED** — Computed in ZK proof |
| **Private Witness** | Individual Adverse Event Flag | **NEVER DISCLOSED** — Evaluated in ZK without side-channels |
| **Public Ledger** | Trial Protocol ID (e.g., #101) | **PUBLIC** — Deliberately disclosed on initialization |
| **Public Ledger** | Total Response Count | **PUBLIC AGGREGATE** — Incremented via `disclose(totalResponses + 1)` |
| **Public Ledger** | Cumulative Rating Sum | **PUBLIC AGGREGATE** — Updated via `disclose(ratingSum + rating)` |
| **Public Ledger** | Total Adverse Event Count | **PUBLIC AGGREGATE** — Updated via `disclose(adverseEventCount + flag)` |
| **Public Ledger** | Trial Recruitment Status | **PUBLIC** — Active / Paused flag |

---

## ⚙️ Environment & System Checks

| Requirement | Verified Environment | Status |
| :--- | :--- | :--- |
| **OS / Shell** | WSL Ubuntu 24.04 (`Linux x86_64`) | ✅ PASSED |
| **Node.js** | Node `v22.23.1` (native WSL nvm path) | ✅ PASSED (>= 22.x) |
| **npm** | npm `10.9.8` (WSL native) | ✅ PASSED |
| **Docker** | Docker `29.6.2` & `docker compose` v2.33.1 | ✅ PASSED |
| **Compact Compiler** | `/home/zeal/.local/bin/compact` v0.5.1 | ✅ PASSED |
| **Proof Server** | Port 6300 (`midnightntwrk/proof-server:8.1.0`) | ✅ PASSED |
| **Local Node & Indexer**| Port 9944 (`midnight-node:1.0.0`), Port 8088 (`indexer:4.3.3`)| ✅ PASSED |

---

## 🚀 Quick Start Guide

### 1. Compile Compact Smart Contract
```bash
npm run compile
```
*Compiles `contracts/clinical-trial.compact` into TypeScript interfaces and ZK circuit keys under `contracts/managed/clinical-trial`.*

### 2. Local Network Setup & Contract Deployment
```bash
# Start local Midnight devnet services & deploy contract
npm run setup -- --network undeployed
```

Or deploy directly:
```bash
npm run deploy
```

### 3. Interactive CLI
```bash
npm run cli
```
Provides an interactive menu to:
1. Read current clinical trial public ledger state.
2. Prove & submit anonymous patient feedback in ZK.
3. Initialize new clinical trial protocol IDs.
4. Toggle recruitment active status.
5. Check wallet tNIGHT and DUST balances.

### 4. Run Automated Test Suite
```bash
npm test
```
Runs 8 automated unit tests covering contract managed artifacts, privacy model zero-knowledge boundaries, and helper functions.

### 5. Launch Frontend Web App
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to interact with the glassmorphic React dApp integrated with Midnight Lace Wallet.

---

## 🌐 Preview & Preprod Network Deployment Status

### Local Devnet Deployment (`undeployed`)
- **Status:** **FULLY FUNCTIONAL & DEPLOYED**
- **Contract Address:** `dec3b071d373ec575648e0c5dfee659710312616875db1fb6cd84a06c7cc6dd2`
- **Initialization TxID:** `0082b866a01982419825a6732394df180330183033d2649ce0c9d10e34107c2715`

### Preprod Network Deployment Attempt (`preprod`)
- **Command:** `npm run setup -- --network preprod`
- **Compilation Status:** ✅ Contract compiles cleanly.
- **Proof Server Status:** ✅ Local proof server running and healthy on port 6300.
- **Preprod Indexer Response:** `https://indexer.preprod.midnight.network/api/v4/graphql` reachable.
- **Wallet Sync Status / Blocker:** Public Preprod wallet synchronization via `waitForSyncedState()` experienced RPC websocket disconnections (`wss://rpc.preprod.midnight.network/`). As permitted by mentor rules, the full-stack dApp is delivered fully functional locally while preserving wallet state and seed configuration.

---

## 📋 Submission Checklists

### Level 1 Requirements Checklist
- [x] Compact smart contract written with public ledger state and ZK witness inputs.
- [x] Explicit `disclose(...)` used intentionally only for public aggregated updates.
- [x] Contract compiles via `npm run compile` to `contracts/managed/clinical-trial`.
- [x] Local deployment works cleanly via `npm run setup -- --network undeployed`.
- [x] CLI menu interaction tested and working.
- [x] Preprod deployment attempted and status/blocker documented in README.
- [x] Wallet seed and state persisted in `.midnight-state.json`.

### Level 2 Requirements Checklist
- [x] Modern frontend web app built with Vite, React, and TypeScript.
- [x] Midnight Lace wallet Connect / Disconnect button and status display.
- [x] Contract address and network loaded dynamically from `.env` environment.
- [x] Frontend calls main ZK circuits (`submitFeedback`, `initializeTrial`, `toggleTrialStatus`).
- [x] Public ledger state dashboard displayed in real-time.
- [x] User enters private rating/secret; ZK proof generated without displaying private witness publicly.
- [x] Deployment configured for Vercel/Netlify with `.env.example`.

### Level 3 Requirements Checklist
- [x] 8 automated unit tests created covering contract managed exports, ZK privacy rules, and helper logic.
- [x] GitHub Actions CI workflow configured (`.github/workflows/ci.yml`).
- [x] Product proposal & Privacy Model section documented.
- [x] Rich, glassmorphic UX with responsive layouts, glowing badges, loading/proving spinners, and clear state messaging.
- [x] At least 10 meaningful, descriptive Git commits created without AI co-author trailers.

---

## 📁 Repository Structure

```
.
├── contracts/
│   ├── clinical-trial.compact       # Compact ZK Smart Contract
│   └── managed/                     # Generated circuit keys & TypeScript bindings
├── src/
│   ├── setup.ts                     # Devnet setup & container management
│   ├── deploy.ts                    # Contract deployment script
│   ├── cli.ts                       # Interactive CLI tool
│   ├── wallet.ts                    # Wallet state provider
│   ├── network.ts                   # Network configuration registry
│   └── check-balance.ts             # Wallet balance utility
├── frontend/                        # React + Vite Web Application
│   ├── src/
│   │   ├── components/              # Navbar, Dashboard, Feedback Form, Admin Panel, Privacy Banner
│   │   ├── hooks/                   # Lace Wallet Hook
│   │   ├── App.tsx                  # Main Full-Stack Application
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── tests/                           # Automated Test Suite (Node.js Test Runner)
│   ├── contract.test.ts
│   ├── privacy.test.ts
│   └── helper.test.ts
├── .github/
│   └── workflows/
│       └── ci.yml                   # GitHub Actions CI Workflow
├── .env.example                     # Environment Template
├── docker-compose.yml               # Devnet Docker Compose (Node, Indexer, Proof Server)
├── package.json
└── README.md                        # Documentation
```

---

## 📄 License
MIT License
