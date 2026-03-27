export type DecisionCategory = 'career' | 'financial' | 'strategic' | 'personal' | 'technical';
export type FutureEvent = 'market_crash' | 'tech_breakthrough' | 'personal_growth' | 'external_disruption' | 'success_milestone';

export interface DecisionVariable {
  name: string;
  type: 'numeric' | 'boolean' | 'categorical';
  currentValue: any;
  volatility: number; // 0.0 to 1.0
}

export interface FutureScenario {
  id: string;
  path: string[]; // List of events
  outcomeScore: number; // -1.0 to 1.0 (Destructive to Hyper-Success)
  probability: number;
  timeHorizonYears: number;
}

export interface InferenceResult {
  decisionId: string;
  summary: string;
  bestPathConfidence: number;
  successProbability: number;
  topRisks: string[];
  simulatedScenarios: number;
}

export interface InferenceConfig {
  maxSimulations: number;
  maxDepthYears: number;
  parallelBatches: number;
}

export interface InferenceLogEntry {
  timestamp: string;
  event: 'ANALYSIS_START' | 'SIMULATION_STEP' | 'OUTCOME_AGGR' | 'STOCHASTIC_HIT';
  details: string;
}
