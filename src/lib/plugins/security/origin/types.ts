export type ScanState = 'idle' | 'scanning' | 'verifying' | 'granted' | 'denied';

export interface BiometricTemplate {
  id: string;
  type: 'face' | 'vein' | 'fingerprint';
  hash: string;
  createdAt: string;
}

export interface LivenessResult {
  isAlive: boolean;
  score: number; // 0.0 to 1.0
  tells: string[];
}

export interface VeinPattern {
  id: string;
  geometry: string;
  thermalSignature?: string;
}

export interface OriginConfig {
  livenessThreshold: number;
  requireMultiFactor: boolean;
  autoLockOnAbsence: boolean;
}
