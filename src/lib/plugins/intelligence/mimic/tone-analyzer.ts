import { PersonaMode } from './types';

export class ToneAnalyzer {
  analyze(urgency: number, risk: string): PersonaMode {
    console.log(`[MIMIC-TONE] Analyzing situational urgency (${urgency}) and risk (${risk}).`);
    
    if (risk === 'CRITICAL') return 'AUTHORITATIVE';
    if (urgency > 0.8) return 'EMERGENCY';
    if (urgency > 0.5) return 'PROFESSIONAL';
    
    return 'CASUAL';
  }
}
