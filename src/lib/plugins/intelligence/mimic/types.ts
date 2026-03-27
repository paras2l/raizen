export type PersonaMode = 'CASUAL' | 'PROFESSIONAL' | 'FORMAL' | 'ANALYTICAL' | 'CREATIVE' | 'AUTHORITATIVE' | 'EMERGENCY';

export interface ToneSettings {
  formality: number;
  brevity: number;
  enthusiasm: number;
}

export interface PersonaProfile {
  id: string;
  name: string;
  tone: string;
  vocabularyLevel: 'simple' | 'standard' | 'precise' | 'expressive';
  sentenceStructure: 'conversational' | 'structured' | 'complex' | 'analytical';
  voiceSettings: VoiceModulation;
}

export interface VoiceModulation {
  pacing: number; // 0.0 to 1.0
  pitch: number; // 0.0 to 1.0
  intensity: number; // 0.0 to 1.0
}

export interface ContextTone {
  urgency: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  topic: string;
  userEmotion?: string;
}

export interface BehavioralHistory {
  timestamp: string;
  context: string;
  personaUsed: PersonaMode;
}

export interface MimicConfig {
  defaultMode: PersonaMode;
  enableVoiceModulation: boolean;
  adaptiveBrevity: boolean;
}
