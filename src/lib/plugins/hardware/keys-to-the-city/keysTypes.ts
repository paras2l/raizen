export interface InfrastructureNode {
  id: string;
  type: 'TRAFFIC_LIGHT' | 'ELEVATOR' | 'DOOR' | 'GATE';
  location: { lat: number; lng: number; floor?: number };
  status: 'IDLE' | 'BUSY' | 'OVERRIDDEN' | 'OFFLINE';
  lastPing: number;
}

export interface TrafficState {
  zoneId: string;
  congestionLevel: number; // 0.0 to 1.0
  averageSpeed: number;
  activeIncidents: string[];
}

export interface TransitPath {
  id: string;
  nodes: InfrastructureNode[];
  riskLevel: number;
  eta: number;
  lastUpdated: number;
}

export interface RiskAlert {
  id: string;
  type: 'CRIME' | 'PROTEST' | 'CONSTRUCTION' | 'ACCIDENT';
  severity: number;
  location: { lat: number; lng: number };
  timestamp: number;
}
