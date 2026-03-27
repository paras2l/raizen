import { EnergyPolicy } from './types';

export class EnergyPolicyManager {
  private policy: EnergyPolicy = {
    mode: 'balanced',
    thresholds: { low: 20, critical: 10 }
  };

  getPolicy(): EnergyPolicy {
    return this.policy;
  }

  updatePolicy(newPolicy: Partial<EnergyPolicy>) {
    this.policy = { ...this.policy, ...newPolicy };
  }
}
