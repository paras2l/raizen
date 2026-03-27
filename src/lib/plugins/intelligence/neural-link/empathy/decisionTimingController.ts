import { TimingAdjustment, StressLevel } from './empathyTypes';
import { EmpathyConfig } from './empathyConfig';
import { empathyLogger } from './empathyLogger';

export class DecisionTimingController {
  public async calculateAdjustment(level: StressLevel): Promise<TimingAdjustment> {
    const delay = level === 'CRITICAL' ? EmpathyConfig.PACING.EXTENDED_DELAY_MS : 
                  level === 'ELEVATED' ? EmpathyConfig.PACING.DEFAULT_DELAY_MS : 0;
                  
    if (delay > 0) {
        await empathyLogger.pacing(delay, `Stress level: ${level}`);
    }

    return {
      pacingDelayMs: delay,
      requiredConfirmation: level === 'CRITICAL',
      simplifiedUI: level !== 'STABLE'
    };
  }
}
