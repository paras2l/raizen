export type PowerState = 'FULL_POWER' | 'NORMAL' | 'LOW_POWER' | 'CRITICAL_POWER';

export interface EnergyMetrics {
  batteryLevel: number;
  isCharging: boolean;
  cpuPowerUsage?: number;
  thermalState?: 'nominal' | 'fair' | 'serious' | 'critical';
}

export interface OptimizationRule {
  maxAgents: number;
  modelTier: 'high-perf' | 'balanced' | 'efficient';
  enableBackgroundTasks: boolean;
}

export interface EnergyPolicy {
  mode: 'performance' | 'balanced' | 'saver';
  thresholds: {
    low: number;
    critical: number;
  };
}

export interface SustainConfig {
  monitorIntervalMs: number;
  enableThermalThrottling: boolean;
  notifyOnStateChange: boolean;
}
