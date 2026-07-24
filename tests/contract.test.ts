import { describe, it, expect } from 'node:test';
import * as assert from 'node:assert/strict';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const managedPath = path.resolve(__dirname, '..', 'contracts', 'managed', 'clinical-trial', 'contract', 'index.js');

describe('Clinical Trial Contract Managed Artifacts', () => {
  it('should compile and export the Contract class and ledger decoder', async () => {
    assert.strictEqual(fs.existsSync(managedPath), true, 'Managed contract file should exist');
    const ContractModule = await import(`file://${managedPath}`);
    assert.ok(ContractModule.Contract, 'Contract class should be exported');
    assert.ok(typeof ContractModule.ledger === 'function', 'ledger decoder function should be exported');
  });

  it('should instantiate the contract with vacant witnesses', async () => {
    const ContractModule = await import(`file://${managedPath}`);
    const contract = new ContractModule.Contract({});
    assert.ok(contract, 'Contract instance should be created');
    assert.ok(contract.circuits, 'Circuits should be defined on contract');
    assert.ok(contract.circuits.initializeTrial, 'initializeTrial circuit should be present');
    assert.ok(contract.circuits.submitFeedback, 'submitFeedback circuit should be present');
    assert.ok(contract.circuits.toggleTrialStatus, 'toggleTrialStatus circuit should be present');
  });
});
