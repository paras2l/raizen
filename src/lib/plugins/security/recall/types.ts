export type SentinelStatus = 'dormant' | 'active' | 'alert' | 'recovered';

export interface DeviceState {
  location: { lat: number; lng: number; alt: number };
  simStatus: 'present' | 'removed' | 'changed';
  battery: number;
  timestamp: string;
}

export interface RecoveryEvidence {
  snapshotUrl?: string;
  environmentalLog: string[];
  lastKnownLocation: { lat: number; lng: number };
}

export interface ContactInfo {
  name: string;
  method: 'email' | 'push' | 'mesh';
  endpoint: string;
}

export interface RecallConfig {
  maxFailures: number;
  autoBeaconOnSentinel: boolean;
  audibleAlertOnCompromise: boolean;
}
