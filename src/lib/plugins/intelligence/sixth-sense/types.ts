export type SignalCategory = 'weather' | 'traffic' | 'news' | 'finance' | 'safety';

export interface EnvironmentalSignal {
  id: string;
  category: SignalCategory;
  source: string;
  severity: number; // 0.0 to 1.0
  description: string;
  timestamp: string;
}

export interface AggregatedContext {
  chaosIndex: number; // 0.0 to 1.0
  activeThreats: string[];
  lastTrend: 'STABLE' | 'DETERIORATING' | 'IMPROVING';
}

export interface SixthSenseConfig {
  updateIntervalMs: number;
  sensitivityLevel: number;
  monitoredSources: SignalCategory[];
}
