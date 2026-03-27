import { PersonaMode } from './types';

export class AdaptiveOutputEngine {
  transform(text: string, mode: PersonaMode): string {
    console.log(`[MIMIC-OUTPUT] Transforming response to ${mode} syntax.`);
    
    switch (mode) {
      case 'AUTHORITATIVE':
        return `[CRITICAL] ${text.toUpperCase()}. AWAITING CONFIRMATION.`;
      case 'EMERGENCY':
        return `ALERT: ${text}. Immediate action required.`;
      case 'CASUAL':
        return `Hey Chief, ${text.toLowerCase()}. All good!`;
      default:
        return text;
    }
  }
}
