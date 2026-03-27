import { MoodType, ToneType } from './types';

export class PersonaMemory {
  private interactionHistory: Array<{ mood: MoodType; tone: ToneType }> = [];

  record(mood: MoodType, tone: ToneType) {
    this.interactionHistory.push({ mood, tone });
    if (this.interactionHistory.length > 50) this.interactionHistory.shift();
  }

  getDominantMood(): MoodType {
    if (this.interactionHistory.length === 0) return 'relaxed';
    // Simple frequency count mock
    return this.interactionHistory[this.interactionHistory.length - 1].mood;
  }
}
