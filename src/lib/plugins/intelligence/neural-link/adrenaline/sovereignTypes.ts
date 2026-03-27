export type HazardLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ResponseSignal {
  id: string;
  source: 'ACCEL' | 'GPS' | 'SENSOR' | 'NETWORK';
  value: number;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface TacticalAlert {
  id: string;
  level: HazardLevel;
  message: string;
  suggestions: string[];
  timestamp: number;
}

export interface SovereignEvent {
  id: string;
  type: string;
  severity: number;
  resolved: boolean;
}
