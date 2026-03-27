export type AscensionLevel = 'Singularity' | 'Ascension' | 'Absolute-Sovereignty';

export interface AscensionState {
  level: AscensionLevel;
  resonanceScore: number; // 0-1
  activeHarmonics: string[];
  lastSyncTimestamp: number;
}

export interface CosmicSignal {
  source: string;
  target: string;
  intensity: number; // 0-1
  type: 'neural-feedback' | 'market-pressure' | 'resource-pulse' | 'security-lockdown';
  payload: any;
}

export interface AceAction {
  type: 'sync-singularity' | 'trigger-ascension' | 'broadcast-signal' | 'monitor-resonance';
  payload: any;
}
