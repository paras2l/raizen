export interface HardwareKey {
  id: string;
  fingerprint: string;
  type: 'tpm' | 'secure_enclave' | 'hw_token';
  isSecure: boolean;
}

export interface IntegritySignal {
  status: 'valid' | 'compromised' | 'missing';
  lastChecked: string;
  driftDetected: boolean;
}

export interface IdentityProof {
  keyFingerprint: string;
  timestamp: string;
  signature: string;
}

export interface LockdownState {
  isActive: boolean;
  reason: string | null;
  restrictedActions: string[];
}

export interface QuantumConfig {
  checkIntervalMs: number;
  enforceStrictHardwareMatch: boolean;
  recoveryEnabled: boolean;
}
