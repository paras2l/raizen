export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface SafeZone {
  id: string;
  name: string;
  center: GeoPoint;
  radiusMeters: number;
}

export type GateStatus = 'anchored' | 'adrift' | 'locked' | 'unlocked_manual';

export interface RestrictionPolicy {
  blockedActions: string[];
  requireOverrideAboveRisk: number;
}

export interface AnchorConfig {
  safeZones: SafeZone[];
  refreshIntervalMs: number;
  enableWifiAnchoring: boolean;
}
