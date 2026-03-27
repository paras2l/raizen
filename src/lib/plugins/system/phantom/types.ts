export type MountStatus = 'unmounted' | 'mounting' | 'mounted' | 'error';

export interface VolumeMetadata {
  id: string;
  label: string;
  sizeBytes: number;
  isObfuscated: boolean;
  lastMounted?: string;
}

export interface PartitionState {
  volumes: VolumeMetadata[];
  activeVolumeId?: string;
  stealthMode: boolean;
}

export interface EncryptionSpec {
  algorithm: 'AES-256-XTS' | 'CHACHA20-POLY1305';
  keySource: 'master_codeword' | 'biometric';
}

export interface PhantomConfig {
  autoHideOnInactivity: boolean;
  wipeHeadersOnTamper: boolean;
  maxAuthAttempts: number;
}
