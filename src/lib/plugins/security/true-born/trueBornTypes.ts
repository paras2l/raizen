export type IdentityStatus = 'Verified' | 'Unverified' | 'Degraded' | 'Locked';
export type BioSignalTier = 'Neural' | 'Cardiac' | 'Dermal' | 'Rhythmic';

export interface BioSignal {
  tier: BioSignalTier;
  confidence: number;
  timestamp: number;
}

export interface VerificationSession {
  id: string;
  startTime: number;
  signals: BioSignal[];
  isFullyAuthorized: boolean;
}

export interface TrueBornAction {
  type: 'scan' | 'validate' | 'authorize' | 'lock';
  payload: any;
}
