export type ScalingStrategy = 'sequential' | 'parallel' | 'swarm';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DeadlineInfo {
  timestamp: string;
  remainingSeconds: number;
  urgency: UrgencyLevel;
}

export interface ResourceBudget {
  maxAgents: number;
  cpuLimit: number;
  ramLimitMB: number;
  costCap: number;
}

export interface OverclockSession {
  id: string;
  startTime: string;
  deadline: DeadlineInfo;
  activeAgents: number;
  strategy: ScalingStrategy;
}

export interface OverclockConfig {
  maxSwarmSize: number;
  defaultStrategy: ScalingStrategy;
  minUrgencyForSwarm: UrgencyLevel;
}
