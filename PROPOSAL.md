# 📋 Anonymous Clinical Trial Platform — Hackathon Proposal

> **Midnight Hackathon 2025 · Category: Anonymous Feedback / Survey**

---

## 🧬 Project Overview

The **Anonymous Clinical Trial Platform** is a privacy-first clinical research dApp built on **Midnight Network** using **Compact** Zero-Knowledge smart contracts. It enables patients to anonymously participate in clinical trials, submit treatment outcomes, and flag adverse reactions — without ever revealing their identity, wallet address, or personal health data.

The platform aggregates patient-submitted feedback into tamper-proof on-chain statistics while keeping all individual inputs cryptographically private inside client-side ZK witness circuits.

---

## 🏥 Clinical Trial Privacy Problem

Traditional clinical trial data collection suffers from fundamental privacy failures:

| Problem | Impact |
|---|---|
| **Centralized PHI databases** | Single points of data breach exposing millions of health records |
| **Identity-linked participation** | Patients face employment, insurance, and social discrimination |
| **Under-reporting of adverse effects** | Fear of stigma leads to incomplete drug safety data |
| **Cross-border compliance** | HIPAA / GDPR friction blocks international research collaboration |
| **Coercive consent environments** | Patients feel pressured to consent to data sharing |
| **Re-identification risk** | Anonymized datasets are routinely de-anonymized by adversaries |

The status quo creates a lose-lose: patients sacrifice privacy, yet research quality suffers from under-reporting and selection bias.

---

## 💡 Solution

The **Anonymous Clinical Trial Platform** inverts this model:

1. **Patients generate a local `participantSecret`** (random 32-byte entropy) in their browser — never sent to any server.
2. **A `participantCommitment`** is derived from the secret and submitted into the ZK circuit as a private witness input.
3. **The circuit validates eligibility** via a private `eligibilityWitness` (locally computed age/condition assertion) without revealing the underlying health data.
4. **Only aggregate statistics** (total responses, rating sums, adverse event counts) are publicly disclosed on the Midnight ledger via explicit `disclose()` calls.
5. **No wallet address, patient identity, or individual response** ever touches the public ledger.

---

## 🌙 Why Midnight

Midnight Network is uniquely suited for this application:

- **Default-on Privacy:** All smart contract state is private by default. Developers must explicitly call `disclose()` to make data public.
- **Compact Language:** A typed, circuit-friendly language that compiles down to ZK proving circuits with minimal developer effort.
- **Client-Side Proving:** ZK proofs are generated locally in the patient browser — patient secrets never leave the device.
- **Native ZK Assertions:** `assert()` statements compile into ZK constraints, enabling eligibility checks without revealing underlying health data.
- **Selective Disclosure:** Only values explicitly wrapped in `disclose()` become part of on-chain state.

---

## 🔐 Why Zero-Knowledge Proofs

ZK proofs are the only cryptographic primitive that can simultaneously achieve:

- **Correctness:** The patient genuinely satisfied eligibility constraints (rating in bounds 1–5, trial active)
- **Privacy:** No observer can learn the patient secret, individual rating, or identity from the proof
- **Non-interactivity:** No trusted third party or coordinator is required to validate submissions
- **Unlinkability:** Multiple submissions from the same patient cannot be correlated by any on-chain observer

---

## 🛡️ Privacy Benefits

| Benefit | Technical Mechanism |
|---|---|
| Anonymous patient participation | `participantSecret` stays in browser memory, never disclosed |
| Unlinkable submissions | No wallet address or identity included in circuit inputs |
| Private eligibility verification | `eligibilityWitness` checked inside ZK circuit via `assert()` |
| No individual response leakage | `rating` and `adverseEventFlag` are private witness parameters |
| Tamper-proof aggregate statistics | Public ledger state is append-only via `disclose()` |
| GDPR/HIPAA compliant by design | No personal data ever transmitted to any server |

---

## 🔑 Witness Inputs

The Compact contract uses the following **private witness inputs** used in ZK proof generation but **never appearing on the public ledger**:

| Witness Input | Type | Purpose |
|---|---|---|
| `participantSecret` | `Bytes<32>` | Patient unique random secret — proves authorship without revealing identity |
| `participantCommitment` | `Bytes<32>` | Cryptographic commitment derived from participantSecret + trialId |
| `eligibilityWitness` | `Uint<64>` | Locally-asserted eligibility score (age/condition flags encoded as bitmap) |
| `rating` | `Uint<64>` | Patient satisfaction rating 1–5 — private, only sum is disclosed |
| `adverseEventFlag` | `Uint<64>` | Adverse reaction flag (0 or 1) — private, only count is disclosed |

These witness values are used inside circuit assertions (`assert()`) to constrain computation, but are **never passed to `disclose()`** — they remain cryptographically hidden inside the ZK proof.

---

## 📊 Public State

The following values are intentionally disclosed on the public Midnight ledger using `disclose()`:

| Public Ledger Field | Type | Description |
|---|---|---|
| `trialId` | `Uint<64>` | Trial protocol identifier |
| `totalResponses` | `Uint<64>` | Cumulative count of verified anonymous submissions |
| `ratingSum` | `Uint<64>` | Sum of all satisfaction ratings (used to compute average) |
| `adverseEventCount` | `Uint<64>` | Total adverse reaction flags reported |
| `isTrialActive` | `Boolean` | Recruitment status flag |

These are **aggregate values only** — no individual response data is ever disclosed.

---

## 🔒 Private State

The following values **never appear on the public ledger** under any circumstances:

- Individual patient identity or wallet address
- `participantSecret` or `participantCommitment`
- `eligibilityWitness` values
- Individual satisfaction rating values
- Individual adverse event flags
- Trial nonce / session entropy

---

## 💼 Business Value

| Stakeholder | Value Delivered |
|---|---|
| **Patients** | Participate in research without privacy sacrifice or discrimination risk |
| **Pharmaceutical companies** | Higher response rates and more honest adverse event reporting |
| **Regulatory bodies** | Cryptographically verified data integrity without HIPAA violations |
| **Research institutions** | Cross-border collaboration without data sovereignty conflicts |
| **Public health organizations** | Real-time aggregate epidemiological insights |

---

## 🚀 Future Roadmap

### Phase 1 — Completed (Hackathon)
- ✅ Compact ZK smart contract with witness inputs and disclose() boundaries
- ✅ Midnight Lace Wallet integration
- ✅ Anonymous feedback submission flow
- ✅ Public aggregate dashboard
- ✅ Automated test suite

### Phase 2 — Q3 2025
- Multi-trial registry (multiple concurrent trials)
- IRB (Institutional Review Board) on-chain approval circuits
- Encrypted off-chain storage integration

### Phase 3 — Q4 2025
- SNARK-based eligibility credential system (ZK EHR integration)
- Aggregate result publication with privacy-preserving statistical methods
- Decentralized IRB governance via on-chain voting

### Phase 4 — 2026
- FDA / EMA regulatory framework alignment
- International clinical trial registry integration
- ZK reputation system for trial coordinators

---

## 🏆 Hackathon Category Justification

**Category: Anonymous Feedback / Survey**

This project is a textbook exemplar of the Anonymous Feedback / Survey category:

- **Anonymous:** Patient identity, wallet, and individual responses are cryptographically private via ZK witnesses
- **Feedback:** Patients submit satisfaction ratings (1–5) and adverse event flags for treatment outcomes
- **Survey:** The platform aggregates patient-reported outcomes across an entire clinical trial cohort

The clinical trial setting elevates anonymity from preference to medical necessity — making Midnight Network's privacy guarantees not just useful but **ethically essential**.

---

## ✅ Level 1 Compliance

**Requirement:** A working Midnight dApp that uses Compact smart contracts.

| Criterion | Status | Evidence |
|---|---|---|
| Compact smart contract written | ✅ PASS | `contracts/clinical-trial.compact` |
| Contract compiles without errors | ✅ PASS | `npm run compile` |
| Contract uses `disclose()` correctly | ✅ PASS | See `submitFeedback` circuit |
| Frontend connects to Midnight | ✅ PASS | `useMidnightWallet.ts` |
| Wallet integration present | ✅ PASS | `window.midnight.mnLace` |
| Live deployment | ✅ PASS | https://anonymous-clinical-trial-platform.vercel.app/ |

---

## ✅ Level 2 Compliance

**Requirement:** Demonstrates meaningful use of Midnight privacy model.

| Criterion | Status | Evidence |
|---|---|---|
| Private witness inputs used | ✅ PASS | `participantSecret`, `participantCommitment`, `eligibilityWitness` |
| `disclose()` used intentionally | ✅ PASS | Only aggregate counters disclosed |
| ZK assertions present | ✅ PASS | Rating bounds, trial status, flag validation |
| Privacy model documented | ✅ PASS | README privacy section + PROPOSAL.md |
| No unnecessary data disclosed | ✅ PASS | Individual responses never public |
| Test suite validates privacy logic | ✅ PASS | `tests/privacy.test.ts` |

---

## ✅ Level 3 Compliance

**Requirement:** Production-quality dApp with comprehensive documentation and CI/CD.

| Criterion | Status | Evidence |
|---|---|---|
| CI/CD pipeline | ✅ PASS | `.github/workflows/ci.yml` |
| Automated tests (4+) | ✅ PASS | 8/8 tests passing |
| Live GitHub Actions badge | ✅ PASS | README badge links to CI |
| PROPOSAL.md | ✅ PASS | This document |
| Submission checklist | ✅ PASS | README checklist |
| Demo video | ✅ PASS | YouTube walkthrough |
| Architecture documentation | ✅ PASS | README architecture section |
| Real Lace Wallet integration | ✅ PASS | No mock addresses |
| `.env.example` | ✅ PASS | All required vars present |
| Multiple meaningful commits | ✅ PASS | 20+ commits |

---

*Built with love on Midnight Network for Midnight Hackathon 2025.*
