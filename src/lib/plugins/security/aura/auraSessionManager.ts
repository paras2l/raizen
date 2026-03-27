import { ThreatMap } from './auraTypes';
import { auraLogger } from './auraLogger';

export class AuraSessionManager {
  private scanHistory: ThreatMap[] = [];

  startSession() {
    auraLogger.log('Electronic surveillance monitoring session initialized.');
  }

  logScan(map: ThreatMap) {
    this.scanHistory.push(map);
    if (this.scanHistory.length > 500) this.scanHistory.shift();
  }

  getHistory(): ThreatMap[] {
    return this.scanHistory;
  }

  endSession() {
    auraLogger.success('Surveillance monitoring session concluded and archived.');
  }
}
