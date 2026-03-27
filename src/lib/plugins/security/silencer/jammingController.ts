import { JammingTarget, JammingState } from './silencerTypes';
import { silencerLogger } from './silencerLogger';
import { silencerConfig } from './silencerConfig';

export class JammingController {
  private activeJamming: JammingState | null = null;

  async initiateBlackout(radiusKm: number, durationMs: number): Promise<JammingState> {
    const radius = Math.min(radiusKm, silencerConfig.maxRadiusKm);
    silencerLogger.jamming(`Initiating wide-spectrum signal silencing in ${radius}km radius...`);
    
    // Simulate jamming initialization
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    this.activeJamming = {
      id: `JAM-${Date.now()}`,
      active: true,
      radiusKm: radius,
      durationMs,
      startTime: Date.now(),
    };

    silencerLogger.success(`Privacy blackout active. All local signals silenced.`);
    return this.activeJamming;
  }

  async stopBlackout() {
    if (!this.activeJamming) return;
    silencerLogger.log('Restoring local communication channels...');
    this.activeJamming = null;
    silencerLogger.success('Environment secure. Jamming sequence terminated.');
  }

  status(): JammingState | null {
    return this.activeJamming;
  }
}
