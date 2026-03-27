export type MissionMode = 'normal' | 'deep_work' | 'sleep' | 'away' | 'focus' | 'relax';

export interface HAConfig {
  baseUrl: string;
  token: string;
  defaultMode: MissionMode;
  rateLimit: number;
}

export interface HAEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
}

export interface DeviceCommand {
  domain: string;
  service: string;
  entity_id: string;
  params?: Record<string, any>;
}

export interface BridgeLogEntry {
  timestamp: string;
  mode: MissionMode;
  entity_id: string;
  action: string;
  result: 'success' | 'failure';
  error?: string;
}

export interface MissionModeTarget {
  entity_id: string;
  domain: string;
  service: string;
  data: Record<string, any>;
}
