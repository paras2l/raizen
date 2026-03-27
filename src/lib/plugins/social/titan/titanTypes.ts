export interface GlobalBreakthrough {
  id: string;
  domain: 'HEALTH' | 'TECH' | 'SCIENCE' | 'OTHER';
  title: string;
  summary: string;
  sourceUrl: string;
  discoveredAt: number;
}

export interface EvaluatedSolution {
  breakthroughId: string;
  relevanceScore: number; // 0.0 to 1.0
  technicalFeasibility: number;
  personalImpactValue: string;
}

export interface EmotionalContext {
  currentState: string;
  longTermGoals: string[];
  coreValues: string[];
}

export interface AlignmentReport {
  solutionId: string;
  emotionalResonance: number; // 0.0 to 1.0
  pros: string[];
  cons: string[];
  winProbability: number;
}

export interface TitanSession {
  sessionId: string;
  activeContext: EmotionalContext;
  discoveredItems: GlobalBreakthrough[];
}
