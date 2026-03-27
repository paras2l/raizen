import { EquilibriumConfig } from './equilibriumConfig';
import { UIMood, StressLevel } from './equilibriumTypes';
import { equilibriumLogger } from './equilibriumLogger';

export class UIMoodAdapter {
  private currentMood: UIMood = 'STABLE';

  public async determineMood(stress: StressLevel): Promise<UIMood> {
    let newMood: UIMood = 'STABLE';

    if (stress.score > 0.8 || stress.isSpike) {
        newMood = 'RESTORATIVE';
    } else if (stress.score > 0.5) {
        newMood = 'CALM';
    }

    if (newMood !== this.currentMood) {
        this.currentMood = newMood;
        await equilibriumLogger.log(`UI Mood adapting to ${newMood}`, { 
            config: EquilibriumConfig.UI.PALETTE_CALM 
        });
        
        // This would signal the frontend to apply a CSS theme/class
        // window.raizen.ui.applyMood(newMood);
    }

    return newMood;
  }
}
