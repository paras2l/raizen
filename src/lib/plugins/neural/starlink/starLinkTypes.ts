export interface OrbitalStream {
  id: string;
  source: string; // e.g., 'Star-01', 'Galactic-Alpha'
  bandwidthMbps: number;
  encryptionTier: 'Military' | 'Quantum' | 'Neural';
}

export interface NeuralPacket {
  id: string;
  streamId: string;
  content: any;
  priority: number;
  latencyMs: number;
}

export interface CacheStatus {
  sizeMb: number;
  availableSpaceMb: number;
  retentionDays: number;
}

export interface StarLinkAction {
  type: 'uplink' | 'cache' | 'sync' | 'status';
  payload: any;
}
