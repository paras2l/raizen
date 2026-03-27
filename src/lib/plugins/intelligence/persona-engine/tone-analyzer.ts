import { MoodState, ToneType } from './types';

export class ToneAnalyzer {
  select(mood: MoodState, contextStyle: string): ToneType {
    console.log(`[PERSONA-TONE] Pivoting tone for ${mood.current} state.`);

    if (mood.current === 'frustrated') return 'supportive';
    if (mood.current === 'focused') return 'professional';
    if (mood.current === 'creative') return 'motivational';
    
    return contextStyle === 'casual' ? 'casual' : 'professional';
  }
}
