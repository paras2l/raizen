export type HardeningLevel = 'standard' | 'enhanced' | 'fortress' | 'lockdown';

export interface MicroEvent {
  id: string;
  type: 'api_call' | 'file_access' | 'network_packet' | 'auth_attempt';
  source: string;
  payload: any;
  timestamp: string;
}

export interface BreachReport {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  indicators: string[];
  status: 'detected' | 'isolated' | 'neutralized';
}

export interface IsolationAction {
  targetId: string;
  type: 'terminate' | 'disconnect' | 'lock';
  reason: string;
}

export interface IncidentData {
  reportId: string;
  trace: string[];
  sourceIp?: string;
}

export interface AegisConfig {
  retentionLimit: number;
  autoIsolateHighRisk: boolean;
  alertChannels: string[];
}
