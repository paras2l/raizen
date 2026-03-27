import { PersonaMode, PersonaProfile } from './types';

export class PersonaProfileManager {
  private profiles: Record<PersonaMode, PersonaProfile> = {
    'CASUAL': { id: 'p_casual', name: 'Robin (Casual)', tone: 'relaxed', vocabularyLevel: 'simple', sentenceStructure: 'conversational', voiceSettings: { pacing: 0.6, pitch: 0.7, intensity: 0.8 } },
    'PROFESSIONAL': { id: 'p_prof', name: 'Assistant (Standard)', tone: 'professional', vocabularyLevel: 'standard', sentenceStructure: 'structured', voiceSettings: { pacing: 0.5, pitch: 0.5, intensity: 0.4 } },
    'FORMAL': { id: 'p_formal', name: 'Alfred (Formal)', tone: 'dignified', vocabularyLevel: 'precise', sentenceStructure: 'complex', voiceSettings: { pacing: 0.4, pitch: 0.3, intensity: 0.2 } },
    'ANALYTICAL': { id: 'p_anal', name: 'Scholar (Analytical)', tone: 'structured', vocabularyLevel: 'precise', sentenceStructure: 'analytical', voiceSettings: { pacing: 0.5, pitch: 0.4, intensity: 0.3 } },
    'CREATIVE': { id: 'p_creat', name: 'Muse (Creative)', tone: 'imaginative', vocabularyLevel: 'expressive', sentenceStructure: 'conversational', voiceSettings: { pacing: 0.7, pitch: 0.6, intensity: 0.7 } },
    'AUTHORITATIVE': { id: 'p_auth', name: 'Commander', tone: 'commanding', vocabularyLevel: 'precise', sentenceStructure: 'structured', voiceSettings: { pacing: 0.6, pitch: 0.2, intensity: 1.0 } },
    'EMERGENCY': { id: 'p_emer', name: 'Alert System', tone: 'urgent', vocabularyLevel: 'simple', sentenceStructure: 'structured', voiceSettings: { pacing: 0.9, pitch: 0.5, intensity: 0.9 } }
  };

  getProfile(mode: PersonaMode): PersonaProfile {
    console.log(`[MIMIC-PROFILES] Retrieving profile for mode: ${mode}`);
    return this.profiles[mode];
  }
}
