export interface VersionSnapshot {
  snapshotId: string;
  sourceId: string;
  timestamp: number;
  data: string; // Encrypted state
  checksum: string;
}

export interface TimeVaultNode {
  nodeId: string;
  status: 'ACTIVE' | 'SYNCING';
  snapshotCount: number;
  lastPulse: number;
}

export interface RollbackState {
  targetSnapshotId: string;
  reversionStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
  originalStateId: string;
}

export interface BabelSession {
  sessionId: string;
  activeTracking: boolean;
  totalSnapshots: number;
}
