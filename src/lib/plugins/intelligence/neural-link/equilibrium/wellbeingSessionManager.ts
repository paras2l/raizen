import { WellbeingSession, StressLevel } from './equilibriumTypes';
import { equilibriumLogger } from './equilibriumLogger';

export class WellbeingSessionManager {
  private activeSession?: WellbeingSession;
  private history: WellbeingSession[] = [];

  public async startSession(initialStress: number): Promise<WellbeingSession> {
    this.activeSession = {
      id: `WELL_${Math.random().toString(36).slice(2, 9)}`,
      startTime: Date.now(),
      initialStress
    };
    await equilibriumLogger.log('Wellbeing restoration session started.', { initialStress });
    return this.activeSession;
  }

  public async updateSession(stress: StressLevel) {
    if (this.activeSession) {
        // Track progress in a more complex implementation
    }
  }

  public async endSession(finalStress: number) {
    if (this.activeSession) {
      this.activeSession.endTime = Date.now();
      this.activeSession.finalStress = finalStress;
      this.history.push(this.activeSession);
      const improvement = this.activeSession.initialStress - finalStress;
      await equilibriumLogger.log('Wellbeing session concluded.', { improvement });
      this.activeSession = undefined;
    }
  }

  public getHistory(): WellbeingSession[] {
    return this.history;
  }
}
