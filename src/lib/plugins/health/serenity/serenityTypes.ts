export type StressLevel = 'Low' | 'Moderate' | 'High' | 'Burnout-Risk';

export interface StressProfile {
  id: string;
  level: StressLevel;
  cognitiveLoad: number; // 0-1
  typingErraticism: number; // 0-1
  taskSwitchingFrequency: number; // per min
  timestamp: number;
}

export interface EnvironmentalState {
  lightingMode: 'focus' | 'ambient' | 'relax';
  soundscapeId: string;
  notificationFilterActive: boolean;
  temperatureTarget: number;
}

export interface WellnessLogEntry {
  id: string;
  timestamp: number;
  averageStress: StressLevel;
  peakWindowStart: number;
  interventionsCount: number;
}

export interface SerenityAction {
  type: 'monitor-stress' | 'adjust-environment' | 'filter-notifications' | 'log-wellness';
  payload: any;
}
