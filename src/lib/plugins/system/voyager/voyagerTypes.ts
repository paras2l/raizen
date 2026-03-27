export interface TemporalPacket {
  packetId: string;
  payload: string; // Encrypted and self-executing
  broadcastTimestamp: number;
  meshNodes: string[];
  integrityHash: string;
}

export interface MeshNode {
  url: string;
  protocol: 'NOSTR' | 'IPFS';
  status: 'REACHABLE' | 'UNREACHABLE';
  lastSeen: number;
}

export interface CodewordValidation {
  valid: boolean;
  attempts: number;
  lastValidated: number;
  accessGranted: boolean;
}

export interface VoyagerSession {
  sessionId: string;
  activeArchiving: boolean;
  pendingBroadcasts: number;
  completedPackets: string[];
}
