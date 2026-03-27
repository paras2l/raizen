export type QuantumState = 'Coherence' | 'Rotation' | 'Superposition' | 'Entanglement' | 'Decoherence';
export type NodeParity = 'Sync' | 'Drift' | 'Tamper' | 'Offline';

export interface QuantumKey {
  id: string;
  standard: EncryptionStandard;
  publicKey: string;
  privateKey: string;
  entropy: string;
  hash: string;
  timestamp: number;
  createdAt: number;
  expiresAt: number;
}

export interface NodeShard {
  nodeId: string;
  shardCid: string;
  parity: NodeParity;
  timestamp: number;
}

export interface VoidAction {
  type: 'rotate' | 'shred' | 'sync' | 'shield';
  payload: any;
}

export type EncryptionStandard = 'Quantum-AES-256' | 'X-Sovereign-RSA' | 'Void-Chaos-Pulse';

export interface EncryptionSession {
  id: string;
  sessionId: string;
  targetNodeId: string;
  standard: EncryptionStandard;
  startTime: number;
  status: 'active' | 'rotated' | 'closed';
}
