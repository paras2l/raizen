import { EquilibriumConfig } from './equilibriumConfig';
import { UIMood } from './equilibriumTypes';
import { equilibriumLogger } from './equilibriumLogger';

export class CalmEnvironmentGenerator {
  private activeAids: string[] = [];

  public async generateAids(mood: UIMood): Promise<string[]> {
    if (mood === 'RESTORATIVE') {
        const aids = ['AMBIENT_WHITE_NOISE', 'MINIMALIST_WORK_MODE', 'BREATHING_PROMPTS_ACTIVE'];
        if (JSON.stringify(aids) !== JSON.stringify(this.activeAids)) {
            this.activeAids = aids;
            await equilibriumLogger.log('Calm environment aids activated', { aids });
            
            // window.raizen.media.playAmbient('ocean_waves');
        }
        return this.activeAids;
    }

    if (this.activeAids.length > 0) {
        this.activeAids = [];
        await equilibriumLogger.log('Calm environment aids deactivated');
    }

    return [];
  }

  public async triggerBreathingPrompt(): Promise<string> {
    const msg = "Raizen: Let's focus on your breath for 60 seconds. Inhale... Exhale...";
    await equilibriumLogger.log('Breathing prompt triggered manually/biometrically.');
    return msg;
  }
}
