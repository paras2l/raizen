import { IdentityState } from './auraTypes';
import { auraLogger } from './auraLogger';

export class AuraSessionManager {
  private modeStartTime: number = Date.now();
  private history: IdentityState[] = [];

  public async recordShift(state: IdentityState) {
    this.history.push(state);
    if (this.history.length > 20) this.history.shift();
    
    await auraLogger.sync(state);
  }

  public getSessionReport() {
    return {
      activeDuration: Date.now() - this.modeStartTime,
      shifts: this.history.length,
      currentMode: this.history[this.history.length - 1]?.mode || 'RECOVERY'
    };
  }
}
