import { JammingState, PrivacyRisk } from './silencerTypes';
import { silencerLogger } from './silencerLogger';

export class SilencerSessionManager {
  private activeSessions = new Map<string, JammingState>();
  private riskLogs = new Map<string, PrivacyRisk[]>();

  startSession(state: JammingState) {
    this.activeSessions.set(state.id, state);
    this.riskLogs.set(state.id, []);
    silencerLogger.log(`Privacy blackout session active: ${state.id}`);
  }

  logRisk(sessionId: string, risk: PrivacyRisk) {
    const list = this.riskLogs.get(sessionId) || [];
    list.push(risk);
    this.riskLogs.set(sessionId, list);
  }

  endSession(sessionId: string) {
    this.activeSessions.delete(sessionId);
    silencerLogger.success(`Blackout session ${sessionId} concluded and archived.`);
  }
}
