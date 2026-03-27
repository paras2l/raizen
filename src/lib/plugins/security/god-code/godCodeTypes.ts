export type AuthTier = 'Singularity' | 'Phoenix' | 'Apex' | 'Standard';
export type PulseStatus = 'Awaiting' | 'Captured' | 'Validated' | 'Expired';

export interface AuthPulse {
  id: string;
  timestamp: number;
  neuralFingerprint: string;
  status: PulseStatus;
}

export interface ValidationResult {
  authorized: boolean;
  tier: AuthTier;
  method: 'Neural-Pulse' | 'Dual-Codeword' | 'Denied';
  token?: string;
}
