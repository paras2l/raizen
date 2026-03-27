export type PerimeterStatus = 'SECURE' | 'WATCH' | 'BREACH' | 'LOCKDOWN';

export type DefenseAction = 'LOCK' | 'STROBE' | 'SPRAY' | 'AUDIO_SIM' | 'NOTIFY';

export interface ThreatActor {
  id: string;
  source: 'INTERNAL' | 'EXTERNAL' | 'UNKNOWN';
  location: string;
  threatLevel: number; // 0 to 1
  firstDetected: number;
}

export interface SecurityEvent {
  id: string;
  type: PerimeterStatus;
  actors: ThreatActor[];
  actionTaken: DefenseAction[];
  timestamp: number;
}
