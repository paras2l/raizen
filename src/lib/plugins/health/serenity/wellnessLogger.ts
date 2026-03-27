import { serenityLogger } from './serenityLogger';
import { WellnessLogEntry, StressLevel } from './serenityTypes';

export class WellnessLogger {
  private logs: WellnessLogEntry[] = [];

  logWellness(averageStress: StressLevel, interventions: number): WellnessLogEntry {
    const entry: WellnessLogEntry = {
      id: `wellness-${Date.now()}`,
      timestamp: Date.now(),
      averageStress,
      peakWindowStart: Date.now() - 3600000,
      interventionsCount: interventions
    };

    this.logs.push(entry);
    serenityLogger.metricsLogged(interventions);
    return entry;
  }

  getHistory(): WellnessLogEntry[] {
    return this.logs;
  }
}

export const wellnessLogger = new WellnessLogger();
