export type EthicalValue = 'integrity' | 'privacy' | 'loyalty' | 'fairness' | 'risk_tolerance' | 'justice';

export interface ValueScore {
  value: EthicalValue;
  score: number; // 0.0 to 1.0
  weight: number; // Importance in decision making
}

export interface EthicalProfile {
  userId: string;
  values: Record<EthicalValue, ValueScore>;
  lastUpdated: string;
}

export interface MoralDilemma {
  id: string;
  situation: string;
  category: 'privacy' | 'legality' | 'loyalty_conflict' | 'social_impact';
  options: { label: string; impact: Record<EthicalValue, number> }[];
}

export interface AlignmentResult {
  isAligned: boolean;
  score: number;
  recommendation: string;
  reasoning: string[];
  conflicts: EthicalValue[];
}

export interface SoulLogEntry {
  timestamp: string;
  event: 'PROFILE_UPDATED' | 'DILEMMA_DETECTED' | 'ALIGNMENT_CHECK' | 'USER_OVERRIDE';
  details: string;
  score?: number;
}
