export interface DetectedEntity {
  id: string;
  signature: string; // Device/Biometric signature
  lastSeen: number;
  location: { lat: number; lng: number };
  classification: Classification;
  distance: number; // in meters
}

export type Classification = 'FRIEND' | 'FOE' | 'NEUTRAL' | 'UNKNOWN';

export interface ProximityEvent {
  id: string;
  entityId: string;
  eventType: 'ENTER' | 'EXIT' | 'MOVE' | 'ALERT';
  timestamp: number;
}

export interface AegisSession {
  id: string;
  active: boolean;
  startTime: number;
  entitiesTracked: number;
}

export interface SocialMatch {
  entityId: string;
  score: number; // 0.0 to 1.0 confidence
  source: 'CONTACTS' | 'SOCIAL_MEDIA' | 'HISTORIC_DATA' | 'THREAT_DATABASE';
}
