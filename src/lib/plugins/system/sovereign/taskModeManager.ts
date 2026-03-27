import { TaskMode } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class TaskModeManager {
  private activeMode: TaskMode = 'Standby';

  setMode(mode: TaskMode) {
    this.activeMode = mode;
    sovereignLogger.log(`Task prioritization adjusted for: ${mode}`);
    
    switch (mode) {
      case 'Coding':
        sovereignLogger.log('Auto-opening VS Code, Terminal, and Documentation tabs.');
        break;
      case 'Gaming':
        sovereignLogger.log('Allocating peak GPU resources and silencing notifications.');
        break;
      case 'Business':
        sovereignLogger.log('Prioritizing encrypted mail and market intelligence streams.');
        break;
      case 'Stealth':
        sovereignLogger.log('Activating Void Protocol and Ghost IP. Disabling all non-essential telemetry.');
        break;
    }
  }

  getActiveMode(): TaskMode {
    return this.activeMode;
  }
}
