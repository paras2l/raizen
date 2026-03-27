export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  publicKey: string;
  lastSyncTime: string;
}

export interface SyncDelta {
  id: string;
  type: 'vector' | 'metadata' | 'graph';
  operation: 'add' | 'update' | 'delete';
  payload: any;
  timestamp: string;
}

export interface SyncConfig {
  syncIntervalMs: number;
  meshEnabled: boolean;
  maxDeltaSizeMB: number;
  encryptionAlgorithm: 'AES-256-GCM';
}

export interface SyncLogEntry {
  timestamp: string;
  event: 'NODE_DISCOVERED' | 'HANDSHAKE_COMP' | 'DELTA_PUSH' | 'CONFLICT_FIX';
  details: string;
}
