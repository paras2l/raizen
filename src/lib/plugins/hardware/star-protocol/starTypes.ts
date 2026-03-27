export type RelayStatus = 'ACTIVE' | 'STEALTH' | 'FAILBACK' | 'OFFLINE';

export interface GlobalRelay {
  id: string;
  name: string;
  type: 'SATELLITE' | 'CELLULAR' | 'MESH_NODE' | 'CLOUD_BRIDGE';
  location: { lat: number; lng: number; region: string };
  latency: number;
  status: RelayStatus;
  load: number;
}

export interface RemoteDevice {
  id: string;
  alias: string;
  type: 'SERVER' | 'IOT_GATEWAY' | 'SMART_NODE' | 'DRONE' | 'OTHER';
  globalLocation: string;
  lastBridgeTimestamp: number;
  encryptionTier: 'QUANTUM' | 'AES_GSW' | 'NONE';
}

export interface ConnectivityState {
  isBridged: boolean;
  activeRelayId: string | null;
  footprintLevel: 'ZERO' | 'MINIMAL' | 'OBSCURED';
  availableRelays: GlobalRelay[];
}
