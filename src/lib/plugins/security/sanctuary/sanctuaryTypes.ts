export type ZoneStatus = 'Active' | 'Dormant' | 'Transitioning' | 'Override-Active';
export type SensorStatus = 'Gated' | 'Bypassed' | 'Offline';

export interface PrivacyZone {
  id: string;
  radiusKm: number;
  center: { lat: number; lng: number } | 'Current-User-Position';
  status: ZoneStatus;
  activatedAt: number;
}

export interface ZoneAuditEvent {
  id: string;
  zoneId: string;
  action: 'Activated' | 'Modified' | 'Deactivated' | 'Breach-Attempt';
  details: string;
  timestamp: number;
}

export interface SanctuaryAction {
  type: 'activate' | 'gate' | 'shunt' | 'audit';
  payload: any;
}
