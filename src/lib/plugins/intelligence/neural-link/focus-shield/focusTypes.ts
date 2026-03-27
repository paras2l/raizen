export type FocusState = 'NORMAL' | 'ELEVATED' | 'DEEP_FOCUS' | 'CRITICAL_OVERLOAD';

export interface CognitiveMetrics {
  taskSwitchCount: number;
  interactionDensity: number;
  simultaneousProjects: number;
  timestamp: number;
}

export interface FocusSession {
  id: string;
  startTime: number;
  endTime?: number;
  maxLoadReached: number;
  stateHistory: { timestamp: number, state: FocusState }[];
}

export interface FragmentationScore {
  score: number; // 0-1
  frequency: number; // switches per minute
  trend: 'STABLE' | 'RISING' | 'FALLING';
}
