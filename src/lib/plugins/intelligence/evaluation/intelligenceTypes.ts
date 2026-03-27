export interface InferenceCloud {
  predictionId: string;
  variableCount: number;
  confidence: number; // 0.0 to 1.0
  horizonYears: number;
  outcomes: Array<{ scenario: string; probability: number }>;
}

export interface SentientAudit {
  id: string;
  modulePath: string;
  performanceDelta: number;
  suggestedRefactor: string;
  optimizationLevel: 'CRITICAL' | 'HIGH' | 'STABLE';
}

export interface MirrorPulse {
  userId: string;
  toneMatch: number; // 0.0 to 1.0
  logicalShortcuts: string[];
  creativeFlair: 'TECHNICAL' | 'NARRATIVE' | 'ANALYTICAL' | 'ABSTACT';
}

export interface RecursiveState {
  version: string;
  architectureOptimization: number;
  lastImprovement: number;
  nextScheduledSync: number;
}
