import { PsychologicalState, StrategicInsight } from './lensTypes';
import { LensConfig } from './lensConfig';

export class LensSessionManager {
  private history: StrategicInsight[] = [];
  private currentState: PsychologicalState = {
    primaryEmotion: 'NEUTRAL',
    intensityIndex: 0,
    indicators: []
  };

  public updateSession(state: PsychologicalState, insights: StrategicInsight[]) {
    this.currentState = state;
    this.history = [...insights, ...this.history].slice(0, LensConfig.MAX_INSIGHT_HISTORY);
  }

  public getCurrentStatus() {
    return {
        state: this.currentState,
        latestInsights: this.history.slice(0, 3)
    };
  }

  public clear() {
    this.history = [];
    this.currentState = { primaryEmotion: 'NEUTRAL', intensityIndex: 0, indicators: [] };
  }
}
