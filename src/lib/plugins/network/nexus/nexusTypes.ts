export type MeshNodeStatus = 'Active' | 'Synchronizing' | 'Shunned' | 'Offline';
export type ThreatLevel = 'LOW' | 'ELEVATED' | 'HIGH' | 'SYSTEMIC' | 'SINGULARITY';

export interface MeshNode {
  id: string;
  region: string;
  reputation: number;
  status: MeshNodeStatus;
  lastSync: number;
}

export interface ThreatBroadcast {
  id: string;
  sourceNodeId: string;
  timestamp: number;
  level: ThreatLevel;
  pattern: string;
  evidence: any;
}

export interface NexusAuthToken {
  nodeId: string;
  signature: string;
  expires: number;
}
