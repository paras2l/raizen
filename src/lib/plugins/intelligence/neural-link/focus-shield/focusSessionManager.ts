import { FocusSession, FocusState } from './focusTypes';
import { focusLogger } from './focusLogger';

export class FocusSessionManager {
  private activeSession?: FocusSession;
  private history: FocusSession[] = [];

  public startSession(): FocusSession {
    this.activeSession = {
      id: `SESS_${Math.random().toString(36).slice(2, 9)}`,
      startTime: Date.now(),
      maxLoadReached: 0,
      stateHistory: [{ timestamp: Date.now(), state: 'NORMAL' }]
    };
    focusLogger.log('Focus session started.', { sessionId: this.activeSession.id });
    return this.activeSession;
  }

  public async recordStateChange(state: FocusState) {
    if (!this.activeSession) this.startSession();

    this.activeSession!.stateHistory.push({ timestamp: Date.now(), state });
    
    // In a more complex version we'd update maxLoadReached etc.
  }

  public endSession() {
    if (this.activeSession) {
      this.activeSession.endTime = Date.now();
      this.history.push(this.activeSession);
      const duration = (this.activeSession.endTime - this.activeSession.startTime) / 1000;
      focusLogger.log(`Focus session ended. Duration: ${duration}s.`);
      this.activeSession = undefined;
    }
  }

  public getSessionHistory(): FocusSession[] {
    return this.history;
  }
}
