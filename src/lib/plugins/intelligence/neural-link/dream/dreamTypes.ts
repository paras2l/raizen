export interface UnresolvedProblem {
  id: string;
  topic: string;
  description: string;
  context: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: number;
}

export interface SimulationResult {
  problemId: string;
  pathwaysDetour: string[];
  optimizedLogic: string;
  confidence: number;
}

export interface MorningBriefing {
  date: string;
  topInsights: string[];
  suggestedActions: string[];
  simulationSummary: string;
}
