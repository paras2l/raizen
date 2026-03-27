import { RaizenBasePlugin } from './src/lib/plugins/base';
import { SingularityCorePlugin } from './src/lib/plugins/core/singularity-core';
import { eventBus } from './src/lib/plugins/core/event-bus';

// Mock Plugin to test RaizenBasePlugin behavior
class MockSyncPlugin extends RaizenBasePlugin {
    id = 'test.mock';
    name = 'Mock Sync Plugin';
    description = 'Mock Sync Plugin';
    actions = [];
    async execute() { return { success: true }; }
}

async function testLightGenesis() {
    console.log('--- 🔱 STARTING NEURAL TRACE VERIFICATION ---');

    // 1. Setup Mock Plugin
    const plugin = new MockSyncPlugin();
    await plugin.initialize();
    console.log(`[TEST 1] Mock Plugin Initialized. State: ${(plugin as any).singularityState}`);

    // 2. Setup Singularity Core
    const core = new SingularityCorePlugin();
    await core.initialize();
    console.log(`[TEST 2] Singularity Core Initialized.`);

    // 3. Trigger Handshake
    console.log(`[TEST 3] Triggering Genesis Handshake via Core...`);
    await core.execute('synchronize', {});

    // 4. Verify Sync State
    const finalState = (plugin as any).singularityState;
    console.log(`[RESULT] Mock Plugin Singularity State: ${finalState}`);

    if (finalState === 'synchronized') {
        console.log('\n🔱 NEURAL TRACE CONFIRMED: Genesis Handshake operational.');
    } else {
        console.error('\n❌ NEURAL TRACE FAILED: Signal divergence.');
        process.exit(1);
    }

    console.log('\n--- 🔱 VERIFICATION COMPLETE ---');
}

testLightGenesis().catch(e => {
    console.error(e);
    process.exit(1);
});
