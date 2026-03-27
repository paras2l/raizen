import { focusLogger } from './focusLogger';
import { FocusState } from './focusTypes';

export class NotificationControlEngine {
  private currentSuppressionLevel: 'NONE' | 'PARTIAL' | 'TOTAL' = 'NONE';

  public async adjustSuppression(state: FocusState): Promise<string> {
    let newLevel: 'NONE' | 'PARTIAL' | 'TOTAL' = 'NONE';

    switch (state) {
        case 'DEEP_FOCUS':
            newLevel = 'PARTIAL';
            break;
        case 'CRITICAL_OVERLOAD':
            newLevel = 'TOTAL';
            break;
        default:
            newLevel = 'NONE';
    }

    if (newLevel !== this.currentSuppressionLevel) {
        this.currentSuppressionLevel = newLevel;
        await focusLogger.log(`Notification suppression adjusted to ${newLevel}.`);
    }

    return `SUPPRESSION_${newLevel}`;
  }

  public shouldSuppress(priority: 'LOW' | 'NORMAL' | 'URGENT'): boolean {
    if (this.currentSuppressionLevel === 'TOTAL') return true;
    if (this.currentSuppressionLevel === 'PARTIAL' && priority !== 'URGENT') return true;
    return false;
  }
}
