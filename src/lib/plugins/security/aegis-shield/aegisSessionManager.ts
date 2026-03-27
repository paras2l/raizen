import { RelocationPlan } from './aegisTypes';
import { aegisLogger } from './aegisLogger';

export class AegisShieldSessionManager {
  private activePlans: RelocationPlan[] = [];

  startSession() {
    aegisLogger.log('Geopolitical asset shield session active.');
  }

  logPlan(plan: RelocationPlan) {
    this.activePlans.push(plan);
    aegisLogger.log(`Relocation plan archived for asset: ${plan.assetId}.`);
  }

  getActivePlans(): RelocationPlan[] {
    return this.activePlans;
  }
}
