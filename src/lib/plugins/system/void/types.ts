export type RadioState = 'active' | 'isolating' | 'isolated' | 'error';

export interface LockdownStatus {
  isIsolated: boolean;
  timestamp: string;
  triggeredBy?: string;
}

export interface BreachSignal {
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourcePluginId: string;
  description: string;
}

export interface ReconnectionPolicy {
  requireMasterCodeword: boolean;
  sequentialRestoration: boolean;
  sanityCheckEnabled: boolean;
}

export interface VoidConfig {
  autoTriggerOnCritical: boolean;
  isolationLevel: 'soft' | 'hard' | 'absolute';
}
