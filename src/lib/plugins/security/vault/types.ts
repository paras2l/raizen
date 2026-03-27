export type ApprovalStatus = 'pending' | 'signed' | 'denied' | 'expired';
export type SignatureSource = 'MASTER_CODEWORD' | 'MOBILE_DEVICE' | 'HARDWARE_KEY';

export interface Signature {
  source: SignatureSource;
  signature: string; // Cryptographic hash/signature
  timestamp: string;
}

export interface VaultAction {
  id: string;
  actionId: string;
  description: string;
  requiredSignatures: SignatureSource[];
  status: 'awaiting_signatures' | 'authorized' | 'rejected';
}

export interface ApprovalSession {
  id: string;
  action: VaultAction;
  collectedSignatures: Signature[];
  expiresAt: string;
}

export interface VaultConfig {
  threshold: number;
  sessionTimeoutSeconds: number;
}
