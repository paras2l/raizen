export type BehaviorSource = 'conversation' | 'writing' | 'coding' | 'workflow';
export type ToneType = 'professional' | 'casual' | 'technical' | 'urgent' | 'direct';

export interface BehaviorEntry {
  id: string;
  source: BehaviorSource;
  timestamp: string;
  context: string;
  content: string;
}

export interface StyleProfile {
  tone: ToneType;
  verbosity: number; // 0.0 to 1.0 (Brevity to Detail)
  technicality: number; // 0.0 to 1.0
  sentenceComplexity: number;
}

export interface DecisionPattern {
  riskTolerance: number;
  tradeOffFocus: 'speed' | 'accuracy' | 'fairness';
  iterationStyle: 'fast-fail' | 'perfectionist';
}

export interface TwinState {
  accuracyScore: number;
  lastTrained: string;
  samplesCollected: number;
}

export interface TwinLogEntry {
  timestamp: string;
  event: 'BEHAVIOR_CAP' | 'STYLE_SYNC' | 'ACCURACY_UP' | 'FEEDBACK_LOOP';
  details: string;
}
