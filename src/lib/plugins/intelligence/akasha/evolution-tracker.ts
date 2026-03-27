import { EvolutionCheckpoint } from './types';

export class IdentityEvolutionTracker {
  private history: EvolutionCheckpoint[] = [];

  track(newInterests: string[]) {
    const checkpoint: EvolutionCheckpoint = {
      timestamp: new Date().toISOString(),
      focusShift: 'Stability to Expansion',
      dominantInterests: newInterests
    };

    this.history.push(checkpoint);
    console.log(`[AKASHA-EVOLUTION] Logged ${newInterests.length} new identity markers.`);
    
    if (this.history.length > 100) this.history.shift();
  }

  getTrajectory(): EvolutionCheckpoint[] {
    return [...this.history];
  }
}
