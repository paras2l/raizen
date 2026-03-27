export type InteractionSignalType = 'FACIAL' | 'VOCAL' | 'GESTURE' | 'SITUATIONAL';

export interface BehavioralSignal {
  id: string;
  type: InteractionSignalType;
  value: string; // e.g. "Slight Frown", "Elevated Pitch"
  intensity: number; // 0 to 1
  confidence: number; // 0 to 1
  timestamp: number;
}

export interface PsychologicalState {
  primaryEmotion: 'NEUTRAL' | 'CONFIDENT' | 'HESITANT' | 'DECEPTIVE' | 'STRESSED' | 'ENGAGED';
  intensityIndex: number;
  indicators: string[];
}

export interface StrategicInsight {
  id: string;
  observation: string;
  recommendation: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: number;
}
