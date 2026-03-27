export type ROMSegment = 'Apex-Command' | 'Decision-Hierarchy' | 'Identity-DNA' | 'Codeword-Vault' | 'Governance-Rules';
export type DNAStatus = 'Sovereign' | 'Certified' | 'Authenticating' | 'Locked';

export interface ROMAddress {
  start: string;
  end: string;
  segment: ROMSegment;
  immutable: boolean;
}

export interface DNACertificate {
  userId: string;
  biometricHash: string;
  codewordHash: string;
  timestamp: number;
}

export interface IntegrityAlert {
  id: string;
  segment: ROMSegment;
  violation: 'Write-Attempt' | 'Memory-Corruption' | 'Unauthorized-Read';
  severity: 'Critical' | 'Warning';
}
