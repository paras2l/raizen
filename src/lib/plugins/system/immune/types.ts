export type HealthStatus = 'optimal' | 'degraded' | 'critical' | 'compromised';

export interface SystemHealth {
  status: HealthStatus;
  cpuUsage: number;
  memoryUsage: number;
  latencyMs: number;
  failureRate: number;
  isCoreValid?: boolean;
  moduleEfficiency?: { id: string, score: number }[];
}

export interface AnomalyReport {
  id: string;
  moduleId: string;
  type: 'performance' | 'security' | 'stability';
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface QuarantineRecord {
  moduleId: string;
  reason: string;
  timestamp: string;
  status: 'isolated' | 'repaired' | 'removed';
}

export interface ImmuneConfig {
  monitorIntervalMs: number;
  autoRepairEnabled: boolean;
  quarantineThreshold: number;
}
