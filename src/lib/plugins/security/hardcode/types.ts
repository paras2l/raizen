export type AuthorityLevel = 'USER' | 'ADMIN' | 'MASTER';

export interface OverrideCommand {
  id: string;
  rawCommand: string;
  authorityLevel: AuthorityLevel;
  timestamp: string;
  validated: boolean;
}

export interface AuditRecord {
  timestamp: string;
  actor: string;
  action: string;
  authorityLevel: AuthorityLevel;
  status: 'PENDING' | 'EXECUTED' | 'DENIED';
}

export interface HardcodeConfig {
  lockdownThreshold: number;
  sessionTimeoutMinutes: number;
  hashAlgorithm: string;
}
