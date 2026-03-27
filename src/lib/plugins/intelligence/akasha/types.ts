export type MemorySource = 'chat' | 'task' | 'document' | 'email' | 'calendar';
export type IdentityDimension = 'risk_tolerance' | 'ethical_alignment' | 'technical_depth' | 'creativity' | 'focus';

export interface IdentityVector {
  dimension: IdentityDimension;
  value: number; // 0.0 to 1.0
  certainty: number;
  lastUpdated: string;
}

export interface ConceptCluster {
  id: string;
  label: string;
  keywords: string[];
  memoryWeight: number;
  lastActive: string;
}

export interface EvolutionCheckpoint {
  timestamp: string;
  focusShift: string;
  dominantInterests: string[];
}

export interface AkashaConfig {
  compressionRatio: number;
  minCertaintyThreshold: number;
  reclusterIntervalDays: number;
}
