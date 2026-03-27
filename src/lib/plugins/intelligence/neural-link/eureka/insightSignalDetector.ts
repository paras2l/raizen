import { EurekaConfig } from './eurekaConfig';
import { InsightSignal } from './eurekaTypes';
import { eurekaLogger } from './eurekaLogger';

export class InsightSignalDetector {
  private activityCount = 0;
  private lastTriggerTime = 0;

  public async processActivity(type: 'KEYSTROKE' | 'TAB_SWITCH' | 'COMMAND'): Promise<InsightSignal | null> {
    this.activityCount++;
    const now = Date.now();

    // Reset activity count every 10s
    if (now - this.lastTriggerTime > 10000) {
        this.activityCount = 1;
        this.lastTriggerTime = now;
        return null;
    }

    if (this.activityCount > EurekaConfig.THRESHOLDS.ACTIVITY_SPIKE) {
        await eurekaLogger.log('Insight signal detected via activity spike', { count: this.activityCount });
        return { type: 'ACTIVITY_SPIKE', confidence: 0.8, timestamp: now };
    }

    return null;
  }
}
