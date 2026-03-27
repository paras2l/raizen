export interface OrbitalPacket {
  packetId: string;
  payload: string; // Encrypted archive fragment
  destinationNodeId: string;
  transmissionTimestamp: number;
  beamSignature: string;
}

export interface DeepSpaceNode {
  nodeId: string;
  orbitPath: string;
  status: 'REACHABLE' | 'DRIFTING' | 'REDUNDANT';
  storageIntegrity: number;
}

export interface SurvivalProbability {
  timeframeYears: number;
  probability: number; // 0.0 to 1.0
  threatAnalysis: string;
}

export interface CosmicSession {
  sessionId: string;
  activeUplink: boolean;
  totalTransmittedGB: number;
}
