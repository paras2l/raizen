export type StressLevel = 'STABLE' | 'ELEVATED' | 'CRITICAL';

export interface EmotionState {
  level: StressLevel;
  intensityScore: number;
  timestamp: number;
  indicators: string[];
}

export interface TimingAdjustment {
  pacingDelayMs: number;
  requiredConfirmation: boolean;
  simplifiedUI: boolean;
}

export interface CalmProtocol {
  id: string;
  steps: string[];
  activeStepIndex: number;
}
