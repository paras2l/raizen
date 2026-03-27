import { TaskMode } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';
import { sovereignConfig } from './sovereignConfig';

export class ChameleonUI {
  private currentMode: TaskMode = sovereignConfig.defaultMode;

  async morphInterface(mode: TaskMode): Promise<void> {
    sovereignLogger.interface(`Starting transition to ${mode} mode...`);
    
    // Simulate UI layout shift and theme update
    await new Promise(resolve => setTimeout(resolve, sovereignConfig.uiTransitionSpeedMs));
    
    this.currentMode = mode;
    sovereignLogger.success(`Interface successfully morphed to: ${mode}`);
  }

  getCurrentMode(): TaskMode {
    return this.currentMode;
  }
}
