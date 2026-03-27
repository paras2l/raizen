import { PersonaProfile } from './types';

export class ResponseStyleFormatter {
  format(text: string, profile: PersonaProfile): string {
    console.log(`[MIMIC-FORMAT] Transforming text to ${profile.vocabularyLevel} level with ${profile.sentenceStructure} structure.`);
    
    switch (profile.vocabularyLevel) {
      case 'precise':
        return `[VERIFIED] ${text}`;
      case 'simple':
        return text.toLowerCase();
      case 'expressive':
        return `✨ ${text} ✨`;
      default:
        return text;
    }
  }
}
