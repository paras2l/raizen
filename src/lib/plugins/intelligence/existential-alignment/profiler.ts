import { EthicalProfile, EthicalValue, ValueScore } from './types';

export class ValueProfiler {
  private profile: EthicalProfile;

  constructor(userId: string) {
    this.profile = {
      userId,
      lastUpdated: new Date().toISOString(),
      values: {
        integrity: { value: 'integrity', score: 0.8, weight: 1.0 },
        privacy: { value: 'privacy', score: 0.9, weight: 1.2 },
        loyalty: { value: 'loyalty', score: 0.7, weight: 0.8 },
        fairness: { value: 'fairness', score: 0.8, weight: 0.9 },
        risk_tolerance: { value: 'risk_tolerance', score: 0.4, weight: 0.5 },
        justice: { value: 'justice', score: 0.85, weight: 1.1 }
      }
    };
  }

  getProfile(): EthicalProfile {
    return { ...this.profile };
  }

  updateValue(value: EthicalValue, newScore: number) {
    if (this.profile.values[value]) {
      this.profile.values[value].score = Math.max(0, Math.min(1, newScore));
      this.profile.lastUpdated = new Date().toISOString();
      console.log(`[SOUL-PROFILER] Updated ${value} score to ${this.profile.values[value].score}`);
    }
  }

  adjustWeight(value: EthicalValue, adjustment: number) {
    if (this.profile.values[value]) {
      this.profile.values[value].weight += adjustment;
    }
  }
}
