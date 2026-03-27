import { DeadlineInfo, UrgencyLevel } from './types';

export class DeadlineParser {
  parse(input: string): DeadlineInfo {
    console.log(`[OVERCLOCK-PARSER] Extracting temporal constraints from: "${input}"`);
    
    let seconds = 3600; // Default 1 hour
    let urgency: UrgencyLevel = 'low';

    if (input.includes('ASAP') || input.includes('immediately')) {
      seconds = 60;
      urgency = 'critical';
    } else if (input.includes('10 minutes')) {
      seconds = 600;
      urgency = 'high';
    }

    return {
      timestamp: new Date(Date.now() + seconds * 1000).toISOString(),
      remainingSeconds: seconds,
      urgency
    };
  }
}
