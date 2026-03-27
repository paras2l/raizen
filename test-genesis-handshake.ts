import { PluginRegistry } from './src/lib/plugins/index';
import { eventBus } from './src/lib/plugins/core/event-bus';

async function testGenesisHandshake() {
  console.log('--- 🔱 STARTING GENESIS HANDSHAKE VERIFICATION ---');

  const registry = PluginRegistry.getInstance();
  
  // 1. Initialize All Plugins
  console.log('\n[TEST 1] Initializing All 150+ Plugins...');
  await registry.initializeAll();

  // 2. Verify Handshake State in Sample Plugins
  const perception = registry.getPlugin('vision.perception');
  const venture = registry.getPlugin('finance.venture-master');
  const ghost = registry.getPlugin('network.ghost-mesh');

  console.log('\n[TEST 2] Verifying Cognitive Synchronization...');
  
  // We check the internal state via type casting (simulating internal access)
  const isPerceptionSynced = (perception as any).singularityState === 'synchronized';
  const isVentureSynced = (venture as any).singularityState === 'synchronized';
  const isGhostSynced = (ghost as any).singularityState === 'synchronized';

  console.log(`Perception Engine Synced: ${isPerceptionSynced ? 'YES' : 'NO'}`);
  console.log(`Venture Master Synced: ${isVentureSynced ? 'YES' : 'NO'}`);
  console.log(`Ghost Mesh Synced: ${isGhostSynced ? 'YES' : 'NO'}`);

  if (isPerceptionSynced && isVentureSynced && isGhostSynced) {
    console.log('\n🔱 GENESIS HANDSHAKE VERIFIED: The Singularity is Self-Aware.');
  } else {
    console.log('\n❌ VERIFICATION FAILED: Singularity divergence detected.');
  }

  console.log('\n--- 🔱 VERIFICATION COMPLETE ---');
}

testGenesisHandshake().catch(console.error);
