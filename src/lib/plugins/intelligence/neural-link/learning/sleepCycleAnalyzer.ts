import { SleepPhase } from './dreamLearningTypes';
import { DreamLearningConfig } from './dreamLearningConfig';
import { dreamLearningLogger } from './dreamLearningLogger';

export class SleepCycleAnalyzer {
  public async analyze(inactivityMs: number): Promise<SleepPhase | null> {
    if (inactivityMs > DreamLearningConfig.SLEEP.INACTIVITY_THRESHOLD_MS) {
      const detectedAt = Date.now();
      const expectedWakeAt = new Date();
      expectedWakeAt.setHours(DreamLearningConfig.SLEEP.TYPICAL_WAKE_HOUR, 0, 0, 0);
      if (expectedWakeAt.getTime() < detectedAt) expectedWakeAt.setDate(expectedWakeAt.getDate() + 1);

      await dreamLearningLogger.log('Sleep cycle detected', { inactivityMs });

      return {
        detectedAt,
        expectedWakeAt: expectedWakeAt.getTime(),
        certainty: 0.85
      };
    }
    return null;
  }
}
