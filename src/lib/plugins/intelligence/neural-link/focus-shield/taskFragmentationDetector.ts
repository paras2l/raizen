import { FocusConfig } from './focusConfig';
import { FragmentationScore } from './focusTypes';
import { focusLogger } from './focusLogger';

export class TaskFragmentationDetector {
  private switchTimestamps: number[] = [];

  public async recordSwitch(): Promise<FragmentationScore> {
    const now = Date.now();
    this.switchTimestamps.push(now);

    // Clean up older than 1 minute
    this.switchTimestamps = this.switchTimestamps.filter(t => now - t < FocusConfig.DURATIONS.FRAGMENTATION_WINDOW_MS);

    const frequency = this.switchTimestamps.length;
    const score = Math.min(frequency / FocusConfig.SWITCH_LIMITS.CRITICAL_FRAGMENTATION, 1.0);

    if (frequency > FocusConfig.SWITCH_LIMITS.FRAGMENTATION_MIN) {
        await focusLogger.log('Task fragmentation detected', { frequency });
    }

    return {
      score,
      frequency,
      trend: this.calculateTrend()
    };
  }

  private calculateTrend(): 'STABLE' | 'RISING' | 'FALLING' {
    // Placeholder for trend analysis
    return 'STABLE';
  }
}
