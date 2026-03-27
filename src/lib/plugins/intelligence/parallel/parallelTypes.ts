export interface TimelineScenario {
  id: string;
  name: string;
  description: string;
  variableDeltas: Record<string, any>;
  timestamp: number;
}

export interface ProbabilityVector {
  scenarioId: string;
  successRate: number; // 0.0 to 1.0
  riskScore: number; // 0.0 to 1.0
  keyVariables: string[];
}

export interface ImpactReport {
  primaryPath: string;
  alternativePaths: Array<{ pathId: string; deltaValue: number; deltaRisk: number }>;
  recommendation: string;
}

export interface MultiverseSession {
  sessionId: string;
  baseTimelineId: string;
  activeTimelines: string[];
  lastSimulationTimestamp: number;
}
