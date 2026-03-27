import { InsightSignal, ConceptSnapshot } from './eurekaTypes';
import { eurekaLogger } from './eurekaLogger';

export class EurekaSessionManager {
  private currentActiveSignals: InsightSignal[] = [];
  private sessionBreakthroughs: ConceptSnapshot[] = [];

  public async recordSignal(signal: InsightSignal) {
    this.currentActiveSignals.push(signal);
    await eurekaLogger.log(`Creative signal registered in session: ${signal.type}`);
  }

  public recordBreakthrough(snapshot: ConceptSnapshot) {
    this.sessionBreakthroughs.push(snapshot);
  }

  public getSessionReport() {
    return {
        signalCount: this.currentActiveSignals.length,
        breakthroughCount: this.sessionBreakthroughs.length
    };
  }
}
