export type ConnectivityStatus = 'ONLINE' | 'OFFLINE';
export type GhostMode = 'STEALTH' | 'AUTONOMOUS' | 'INACTIVE';

export interface GhostSession {
  id: string;
  activatedAt: string;
  reason: 'NETWORK_LOSS' | 'MANUAL_TRIGGER';
  status: GhostMode;
}

export interface LocalModelManifest {
  id: string;
  name: string;
  sizeMB: number;
  loaded: boolean;
}

export interface SyncDelta {
  timestamp: string;
  actionId: string;
  payload: any;
  synced: boolean;
}

export interface GhostConfig {
  heartbeatIntervalMs: number;
  offlineModelId: string;
  autoSwitch: boolean;
}
