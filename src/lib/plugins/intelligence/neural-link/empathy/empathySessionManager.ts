import { EmotionState } from './empathyTypes';
import { empathyLogger } from './empathyLogger';

export class EmpathySessionManager {
  private history: EmotionState[] = [];

  public async recordState(state: EmotionState) {
    this.history.push(state);
    if (this.history.length > 50) this.history.shift();
    
    if (state.level !== 'STABLE') {
        await empathyLogger.log('Non-stable emotional state recorded', { state });
    }
  }

  public getSessionReport() {
    const stressCounts = this.history.reduce((acc, s) => {
        acc[s.level] = (acc[s.level] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
      totalSamples: this.history.length,
      stressDistribution: stressCounts,
      averageIntensity: this.history.length > 0 ? 
        this.history.reduce((a, b) => a + b.intensityScore, 0) / this.history.length : 0
    };
  }
}
