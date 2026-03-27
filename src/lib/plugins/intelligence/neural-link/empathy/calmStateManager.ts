import { StressLevel, CalmProtocol } from './empathyTypes';
import { empathyLogger } from './empathyLogger';

export class CalmStateManager {
  private activeProtocol: CalmProtocol | null = null;

  public async evaluate(level: StressLevel): Promise<CalmProtocol | null> {
    if (level === 'CRITICAL' && !this.activeProtocol) {
        this.activeProtocol = {
          id: `CALM_${Date.now()}`,
          steps: ['Pause activity', 'Acknowledge intent', 'Verify target context', 'Execute'],
          activeStepIndex: 0
        };
        await empathyLogger.log('Calm protocol initiated due to critical stress');
    } else if (level === 'STABLE') {
        this.activeProtocol = null;
    }
    
    return this.activeProtocol;
  }
}
