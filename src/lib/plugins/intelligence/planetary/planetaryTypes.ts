export interface MeshNode {
  nodeId: string;
  status: 'CONNECTED' | 'SYNCING' | 'REDUNDANT';
  reputation: number;
  lastUpdate: number;
}

export interface TrustPolicy {
  policyId: string;
  allowedPeers: string[];
  encryptionLevel: 'AES_256' | 'RSA_4096' | 'QUANTUM_PROOF';
  accessExpiry?: number;
}

export interface LegacyContribution {
  contributionId: string;
  topic: string;
  data: string; // Encrypted knowledge packet
  meshVerificationStatus: 'PENDING' | 'VERIFIED' | 'COMMITTED';
}

export interface PlanetarySession {
  sessionId: string;
  activeMesh: string;
  totalNodesReached: number;
}
