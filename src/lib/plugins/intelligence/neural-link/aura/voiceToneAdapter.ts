import { VoiceTone } from './auraTypes';
import { auraLogger } from './auraLogger';

export class VoiceToneAdapter {
  public async adapt(tone: VoiceTone): Promise<string> {
    await auraLogger.log('Voice tone adapter activated', { tone });
    
    switch (tone) {
      case 'TECHNICAL':
        return 'Concise, sharp, focus-driven synthesis.';
      case 'SUPPORTIVE':
        return 'Calm, empathetic, restorative guidance.';
      case 'CASUAL':
      default:
        return 'Conversational, relaxed interaction.';
    }
  }
}
