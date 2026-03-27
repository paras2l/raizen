export type ImprovementGoalType = 'accuracy' | 'latency' | 'efficiency' | 'reasoning' | 'memory';
export type DeploymentStage = 'sandbox' | 'staged' | 'production' | 'rolled_back';

export interface ImprovementGoal {
  id: string;
  type: ImprovementGoalType;
  priority: number;
  baselineMetric: number;
  targetMetric: number;
}

export interface ExperimentPayload {
  id: string;
  goalId: string;
  architecture: string;
  parameters: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface BenchmarkResult {
  experimentId: string;
  score: number;
  latencyMs: number;
  memoryUsageMB: number;
  improvementDelta: number; // Percentage
}

export interface ImprovementLogEntry {
  timestamp: string;
  event: 'RESEARCH_START' | 'EXPERIMENT_RUN' | 'BENCHMARK_COMP' | 'UPGRADE_DEPLOY';
  details: string;
}

export interface ImprovementConfig {
  maxSimultaneousExperiments: number;
  resourceCapCPU: number; // 0.0 to 1.0
  autoDeployThreshold: number; // Improvement % required for auto-deploy
  idleOnlyMode: boolean;
}
