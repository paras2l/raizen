import { MoodState, MoodType } from './types';

export class MoodDetector {
  detect(text: string): MoodState {
    const t = text.toLowerCase();
    console.log('[PERSONA-MOOD] Analyzing linguistic sentiment for emotional markers.');

    let current: MoodType = 'relaxed';
    let confidence = 0.6;

    if (t.includes('brutal') || t.includes('crazy') || t.includes('bug') || t.includes('fix')) {
      current = 'frustrated';
      confidence = 0.85;
    } else if (t.includes('ready') || t.includes('let\'s') || t.includes('push')) {
      current = 'focused';
      confidence = 0.8;
    } else if (t.includes('awesome') || t.includes('great') || t.includes('achieved')) {
      current = 'creative';
      confidence = 0.75;
    }

    return { current, confidence, intensity: 0.5 };
  }
}
