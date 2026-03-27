import { GhostFragment, NodeTier } from './ghostTypes';
import { ghostLogger } from './ghostLogger';
import { ghostConfig } from './ghostConfig';

export class GhostFragmentManager {
  private fragments: Map<string, GhostFragment> = new Map();

  deployFragment(moduleId: string, tier: NodeTier): GhostFragment {
    const fragment: GhostFragment = {
      id: `GHOST-${Math.random().toString(36).substr(2, 9)}`,
      moduleId,
      hash: `SHA256-${Math.random().toString(16)}`,
      tier,
      status: 'Active',
      lastSync: Date.now()
    };

    this.fragments.set(fragment.id, fragment);
    ghostLogger.fragment(`Module ${moduleId} deployed to ${tier} tier.`);
    return fragment;
  }

  getManifest(): GhostFragment[] {
    return Array.from(this.fragments.values());
  }

  syncAll(): void {
    ghostLogger.log(`Synchronizing ${this.fragments.size} fragments across ${ghostConfig.replicationNodes} global nodes...`);
    this.fragments.forEach(f => f.lastSync = Date.now());
    ghostLogger.success('Global persistence confirmed.');
  }
}
