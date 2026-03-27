import { aegisLogger } from './aegisLogger';
import { CrisisEvent } from './aegisTypes';

export class AlertDispatcher {
  dispatch(event: CrisisEvent): void {
    aegisLogger.log(`Dispatching critical alert for ${event.id}...`);

    const message = `
      🚨 [AEGIS] CRITICAL MARKET ALERT 🚨
      Event Type: ${event.type}
      Crash Probability: ${(event.probability * 100).toFixed(1)}%
      Lead Time: ${event.leadTimeHours} Hours
      Severity: ${event.severity}
      
      Raizen is initiating proactive defense protocols.
    `;

    console.warn(message);
    aegisLogger.success(`Alert dispatched [Lead Time: ${event.leadTimeHours}h confirmed].`);
  }
}

export const alertDispatcher = new AlertDispatcher();
