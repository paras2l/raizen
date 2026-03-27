export type OptimizationTarget = 'cpu' | 'memory' | 'gpu' | 'latency' | 'throughput';
export type SchedulingStrategy = 'performance' | 'balanced' | 'power_save';

export interface HardwareProfile {
  cpuCores: number;
  ramGB: number;
  gpuType: string;
  hasGpu: boolean;
  architecture: string;
}

export interface RuntimeMetrics {
  cpuUsage: number;
  ramUsage: number;
  agentCount: number;
  avgLatencyMs: number;
  systemEfficiency: number;
}

export interface OptimizationConfig {
  maxParallelAgents: number;
  batchSize: number;
  modelQuantization: string;
  cacheLimitMB: number;
}

export interface OptimizationLogEntry {
  timestamp: string;
  event: 'PROFILE_DETECT' | 'BENCHMARK_RUN' | 'CONFIG_APPLY' | 'ROLLBACK';
  details: string;
}
