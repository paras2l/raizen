import { StressLevel } from './empathyTypes';
import { empathyLogger } from './empathyLogger';

export class EmotionalFeedbackAdapter {
  public async adapt(level: StressLevel): Promise<string> {
    await empathyLogger.log('Feedback adaptation triggered', { level });
    
    switch (level) {
      case 'CRITICAL':
        return 'System state: Stabilizing. Please proceed with single-task focused logic.';
      case 'ELEVATED':
        return 'Noted. Maintaining clarity for complex execution.';
      case 'STABLE':
      default:
        return 'Optimal synchronization active.';
    }
  }
}
