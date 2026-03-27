import { FakeIdentity } from './mirageTypes';
import { mirageLogger } from './mirageLogger';

export class IdentityGenerator {
  generate(count: number): FakeIdentity[] {
    mirageLogger.log(`Synthesizing ${count} high-fidelity digital decoys...`);
    const identities: FakeIdentity[] = [];
    for (let i = 0; i < count; i++) {
        identities.push({
            id: `decoy-${Math.random().toString(36).substr(2, 9)}`,
            alias: `GhostNode_${i}`,
            backstory: "Consistent cross-platform history generated.",
            crossPlatformLinked: true,
            activeStatus: 'propagating'
        });
    }
    return identities;
  }
}
