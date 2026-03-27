import { IdentityState, InteractionMode, VoiceTone } from './auraTypes';
import { auraLogger } from './auraLogger';

export class IdentityStateManager {
  private currentState: IdentityState = {
    mode: 'EXPLORATION',
    tone: 'CASUAL',
    visualDensity: 'MEDIUM',
    timestamp: Date.now()
  };

  public async transition(mode: InteractionMode, tone: VoiceTone): Promise<IdentityState> {
    this.currentState = {
      mode,
      tone,
      visualDensity: mode === 'DEEP_WORK' ? 'HIGH' : mode === 'REST' ? 'LOW' : 'MEDIUM',
      timestamp: Date.now()
    };
    
    await auraLogger.log('Identity mode transition complete', { mode: this.currentState.mode });
    return this.currentState;
  }

  public getCurrentState(): IdentityState {
    return this.currentState;
  }
}
