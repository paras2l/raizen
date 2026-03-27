import { ManipulationEvent } from './shieldTypes';
import { shieldLogger } from './shieldLogger';

export class ShieldSessionManager {
  private threatLog: ManipulationEvent[] = [];

  startSession() {
    shieldLogger.log('Social engineering defense session active.');
  }

  logThreat(event: ManipulationEvent) {
    this.threatLog.push(event);
    shieldLogger.log(`Manipulation threat logged: ${event.id}`);
  }

  getThreatHistory(): ManipulationEvent[] {
    return this.threatLog;
  }
}
