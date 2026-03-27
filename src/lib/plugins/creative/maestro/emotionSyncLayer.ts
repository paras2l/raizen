import { maestroLogger } from './maestroLogger';
import { CompositionState, MusicStyle } from './maestroTypes';

export class EmotionSyncLayer {
  syncWithContext(state: CompositionState, context: any): CompositionState {
    maestroLogger.log(`Syncing ${state.currentStyle} with emotional context...`);

    // 1. Detect Milestones
    if (context.isMilestone) {
      maestroLogger.log('Milestone detected! Triggering Epic-Triumph escalation...');
      return {
        ...state,
        currentStyle: 'Epic-Triumph',
        tempoBpm: state.tempoBpm + 20,
        complexity: Math.min(1.0, state.complexity + 0.3)
      };
    }

    // 2. Adjust for Stress
    if (context.stressLevel > 0.7) {
      maestroLogger.log('Stress spike detected. Shifting to Ambient-Focus/Calming tone...');
      return {
        ...state,
        currentStyle: 'Ambient-Focus',
        tempoBpm: Math.max(70, state.tempoBpm - 15),
        complexity: Math.max(0.2, state.complexity - 0.2)
      };
    }

    return state;
  }

  calculateAuraFidelity(state: CompositionState, brainwaveMatch: number): number {
    // Returns a score of how well the music matches the current brainwave fidelity
    return (brainwaveMatch * 0.8) + (state.complexity * 0.2);
  }
}

export const emotionSyncLayer = new EmotionSyncLayer();
