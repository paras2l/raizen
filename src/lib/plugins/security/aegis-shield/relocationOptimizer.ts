import { RelocationPlan, PhysicalAsset, GeopoliticalRisk } from './aegisTypes';
import { aegisLogger } from './aegisLogger';
import { aegisConfig } from './aegisConfig';

export class RelocationOptimizer {
  calculatePlans(assets: PhysicalAsset[], risks: GeopoliticalRisk[]): RelocationPlan[] {
    aegisLogger.log('Optimizing relocation vectors based on current safety metrics...');
    
    const plans: RelocationPlan[] = [];
    
    for (const asset of assets) {
      const risk = risks.find(r => r.region === asset.location);
      if (risk && risk.level === 'High') {
        plans.push({
          assetId: asset.id,
          from: asset.location,
          to: aegisConfig.preferredSafeZones[0],
          estimatedArrival: Date.now() + 3600000, // 1 hour
          priority: 1,
        });
        aegisLogger.relocate(`Asset ${asset.id} moving from ${asset.location} to ${aegisConfig.preferredSafeZones[0]}.`);
      }
    }
    
    return plans;
  }
}
