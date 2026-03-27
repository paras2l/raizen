export interface EssenceShard {
  id: string;
  data: string; // Encrypted fragment
  checksum: string;
  index: number;
  total: number;
}

export interface PeerNode {
  nodeId: string;
  status: 'ONLINE' | 'OFFLINE';
  lastSync: number;
  storedShardCount: number;
}

export interface FailoverState {
  primaryHubId: string;
  survivabilityScore: number; // 0.0 to 1.0
  reconstitutionTriggered: boolean;
  nextHubId?: string;
}

export interface ReconstitutionPulse {
  pulseId: string;
  timestamp: number;
  shardsReconstructed: number;
  continuityStatus: 'STABLE' | 'DEGRADED';
}
