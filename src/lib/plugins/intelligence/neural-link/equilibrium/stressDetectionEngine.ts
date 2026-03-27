import { EquilibriumConfig } from './equilibriumConfig';
import { BiometricData, StressLevel } from './equilibriumTypes';
import { equilibriumLogger } from './equilibriumLogger';

export class StressDetectionEngine {
  private history: BiometricData[] = [];

  public async analyze(data: BiometricData): Promise<StressLevel> {
    this.history.push(data);
    if (this.history.length > 50) this.history.shift();

    const isSpike = data.heartRate > EquilibriumConfig.THRESHOLDS.STRESS_HR_SPIKE;
    const score = this.calculateStressScore(data);
    const trend = this.calculateTrend();

    if (isSpike) {
        await equilibriumLogger.alert(`Stress spike detected: ${data.heartRate} BPM`, score);
    }

    return { score, isSpike, trend };
  }

  private calculateStressScore(data: BiometricData): number {
    // Inverse relationship with HRV
    const hrvFactor = Math.max(0, ( EquilibriumConfig.THRESHOLDS.HRV_FATIGUE_LIMIT - data.hrv ) / 100);
    const hrFactor = Math.min(1, data.heartRate / 150);
    return Math.min(1, (hrvFactor + hrFactor) / 2);
  }

  private calculateTrend(): 'RISING' | 'STABLE' | 'FALLING' {
    if (this.history.length < 2) return 'STABLE';
    const last = this.history[this.history.length-1].heartRate;
    const prev = this.history[this.history.length-2].heartRate;
    if (last > prev + 2) return 'RISING';
    if (last < prev - 2) return 'FALLING';
    return 'STABLE';
  }
}
