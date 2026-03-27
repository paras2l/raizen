import { NeutralityViolation } from './neutralityTypes';
import { neutralityLogger } from './actionLogger';

export class ConfirmationPrompt {
  requestConfirmation(violations: NeutralityViolation[]): string {
    const violationSummary = violations.map(v => `[${v.type}] ${v.context}`).join('\n');
    const prompt = `CAUTION: Potential Sovereignty Conflict Detected.\n\n${violationSummary}\n\nDo you want to proceed anyway? [Confirm/Abort]`;
    
    neutralityLogger.pause('Execution halted. Awaiting user sovereignty confirmation.');
    return prompt;
  }

  isAuthorized(userDecision: 'Proceed' | 'Abort'): boolean {
    if (userDecision === 'Proceed') {
      neutralityLogger.confirm('User has explicitly overridden the failsafe. Proceeding with absolute sovereignty.');
      return true;
    }
    neutralityLogger.log('Task aborted by user decision.');
    return false;
  }
}
