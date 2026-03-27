export type UrbanEventType = 'TRAFFIC' | 'PROTEST' | 'CRIME' | 'CONSTRUCTION' | 'WEATHER';

export interface UrbanEvent {
  id: string;
  type: UrbanEventType;
  location: { lat: number; lng: number; radius: number };
  severity: number; // 0 to 1
  description: string;
  timestamp: number;
}

export interface RiskLevel {
  score: number; // 0 to 100
  dominantThreat: UrbanEventType | null;
  timestamp: number;
}

export interface NavigationRoute {
  id: string;
  waypoints: { lat: number; lng: number }[];
  eta: number; // seconds
  safetyIndex: number; // 0 to 1
  isReroute: boolean;
}

export interface GridStatus {
  currentPosition: { lat: number; lng: number };
  activeRisk: RiskLevel;
  activeRoute: NavigationRoute | null;
}
