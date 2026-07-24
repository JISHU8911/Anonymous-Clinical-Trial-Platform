import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { NETWORK_CONFIGS, NETWORK_IDS } from '../src/network.js';

describe('Network & Helper Logic', () => {
  it('should support all standard Midnight network identifiers', () => {
    assert.deepStrictEqual(NETWORK_IDS, ['undeployed', 'preview', 'preprod']);
  });

  it('should have valid network configurations for local and preprod environments', () => {
    const undeployed = NETWORK_CONFIGS.undeployed;
    assert.strictEqual(undeployed.networkId, 'undeployed');
    assert.ok(undeployed.indexer.includes('8088'));
    assert.ok(undeployed.proofServer.includes('6300'));

    const preprod = NETWORK_CONFIGS.preprod;
    assert.strictEqual(preprod.networkId, 'preprod');
    assert.ok(preprod.indexer.includes('preprod.midnight.network'));
  });

  it('should format wallet address truncation cleanly for UI display', () => {
    const formatAddress = (addr: string) => {
      if (!addr || addr.length < 16) return addr;
      return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
    };

    const fullAddr = 'mn_addr_undeployed1h3ssm5ru2t6eqy4g3she78zlxn96e36ms6pq996aduvmateh9p9sk96u7s';
    assert.strictEqual(formatAddress(fullAddr), 'mn_addr_un...k96u7s');
  });
});
