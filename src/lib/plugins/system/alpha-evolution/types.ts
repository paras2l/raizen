export type MutationStatus = 'proposal' | 'researching' | 'coding' | 'sandboxed' | 'installed' | 'failed' | 'rolled_back';

export interface MutationProposal {
  id: string;
  featureName: string;
  description: string;
  status: MutationStatus;
  timestamp: string;
}

export interface ModuleMetadata {
  id: string;
  name: string;
  version: string;
  author: 'Raizen';
  path: string;
  stability: number;
  implantedAt: Date;
  permissions: string[];
}

export interface SandboxResult {
  valid: boolean;
  errors: string[];
  vulnerabilities: string[];
}

export interface AlphaConfig {
  autoInstallApproved: boolean;
  sandboxTimeoutMs: number;
  restrictedPaths: string[];
}
