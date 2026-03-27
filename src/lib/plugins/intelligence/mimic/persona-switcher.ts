import { PersonaMode, ToneSettings } from './types';

export class PersonaSwitcher {
  private personas: Record<PersonaMode, ToneSettings> = {
    'CASUAL': { formality: 0.2, brevity: 0.5, enthusiasm: 0.8 },
    'PROFESSIONAL': { formality: 0.7, brevity: 0.4, enthusiasm: 0.3 },
    'FORMAL': { formality: 0.9, brevity: 0.3, enthusiasm: 0.1 },
    AUTHORITATIVE: { formality: 0.95, brevity: 0.7, enthusiasm: 0.2 },
    EMERGENCY: { formality: 0.8, brevity: 0.9, enthusiasm: 0.6 },
    ANALYTICAL: { formality: 0.9, brevity: 0.6, enthusiasm: 0.1 },
    CREATIVE: { formality: 0.4, brevity: 0.5, enthusiasm: 0.9 },
  };

  getSettings(mode: PersonaMode): ToneSettings {
    console.log(`[MIMIC-SWITCHER] Swapping to persona: ${mode}`);
    return this.personas[mode];
  }
}
