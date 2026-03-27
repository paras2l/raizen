import { GeneratedCode } from './thoughtCodeTypes';
import { thoughtCodeLogger } from './thoughtCodeLogger';

export class ThoughtCodeSessionManager {
  private history: GeneratedCode[] = [];

  public async record(code: GeneratedCode) {
    this.history.push(code);
    if (this.history.length > 50) this.history.shift();
    
    await thoughtCodeLogger.log('Session history updated with new synthesis');
  }

  public getSessionStats() {
    return {
      totalSynthesized: this.history.length,
      languagesUsed: [...new Set(this.history.map(h => h.language))],
      lastActivity: Date.now()
    };
  }
}
