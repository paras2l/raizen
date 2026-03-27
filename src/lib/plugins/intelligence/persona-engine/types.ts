export type MoodType = 'focused' | 'stressed' | 'relaxed' | 'creative' | 'frustrated';
export type ToneType = 'professional' | 'casual' | 'supportive' | 'motivational' | 'academic';

export interface PersonaProfile {
  friendliness: number; // 0.0 to 1.0
  formality: number;
  humor: number;
  directness: number;
}

export interface MoodState {
  current: MoodType;
  confidence: number;
  intensity: number;
}

export interface GreetingContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  recentAchievement?: string;
  activeProject?: string;
  lastInteractionMood?: MoodType;
}

export interface PersonaLogEntry {
  timestamp: string;
  event: 'MOOD_DETECT' | 'TONE_SHIFT' | 'GREETING_GEN';
  details: string;
}
