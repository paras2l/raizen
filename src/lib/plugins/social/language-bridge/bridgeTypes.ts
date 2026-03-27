export interface SpeechSegment {
  id: string;
  blob: any; // Audio data
  timestamp: string;
}

export interface TranslationResult {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}

export interface EmotionVector {
  enthusiasm: number; // 0 to 1
  concern: number;
  neutrality: number;
  urgency: number;
}

export interface VoiceProfile {
  pitchBase: number;
  cadenceRate: number;
  emotionalPreservationScore: number;
}
