export type CognitionStatus = 'Stable' | 'Redesigning' | 'Optimizing' | 'Evolving' | 'SINGULARITY';
export type HeuristicPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'ABSOLUTE';

export interface BrillianceMetric {
  baseBrilliance: number;
  currentGrowthRate: number; // e.g., 0.10 for 10%
  lastEvaluation: number;
}

export interface CognitiveUpgrade {
  id: string;
  targetArea: string;
  impactScore: number;
  complexityLevel: number;
  timestamp: number;
}

export interface HeuristicState {
  patternId: string;
  accuracy: number;
  priority: HeuristicPriority;
  lastRefinement: number;
}
