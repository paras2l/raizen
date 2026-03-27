export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ComputedSolution {
  id: string;
  label: string;
  description: string;
  confidence: number;
  isDestructive: boolean;
  estimatedEffortSeconds: number;
}

export interface ArbiterDecision {
  bestSolutionId: string;
  riskLevel: RiskLevel;
  requiresSignOff: boolean;
  executionMode: 'AUTO' | 'PAUSED';
}

export interface OracleState {
  isComputing: boolean;
  activeMissionId: string | null;
  lastDecision: ArbiterDecision | null;
}

export interface OracleConfig {
  autoExecuteConfidenceThreshold: number; // 0.0 to 1.0
  preComputeParallelism: number;
  criticalKeywords: string[];
}
