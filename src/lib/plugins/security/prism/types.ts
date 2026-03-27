export type EncryptionStatus = 'unencrypted' | 'scanning' | 'encrypting' | 'encrypted' | 'shrouded';

export interface VaultMetadata {
  id: string;
  name: string;
  mountPoint: string;
  status: EncryptionStatus;
  lastScanned: string;
}

export interface ShroudState {
  active: boolean;
  triggerSource: string;
  timestamp: string;
  lockedVolumes: string[];
}

export interface KeyProfile {
  id: string;
  algorithm: 'AES-256' | 'KYBER-768' | 'DILITHIUM';
  createdAt: string;
  rotatedAt?: string;
}

export interface PrismConfig {
  autoEnforceEncryption: boolean;
  shroudOnBreach: boolean;
  quamtumHardened: boolean;
}
