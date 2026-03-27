import { LawRecord } from './legisTypes';
import { legisLogger } from './legisLogger';

export class LegisSessionManager {
  private forecastLog: LawRecord[] = [];

  startSession() {
    legisLogger.log('Predictive legal intelligence session active.');
  }

  logForecasts(laws: LawRecord[]) {
    this.forecastLog.push(...laws);
    legisLogger.log(`Archived ${laws.length} law forecasts.`);
  }

  getForecastHistory(): LawRecord[] {
    return this.forecastLog;
  }
}
