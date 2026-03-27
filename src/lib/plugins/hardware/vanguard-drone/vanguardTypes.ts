export interface Drone {
  id: string;
  model: string;
  status: 'IDLE' | 'FLIGHT' | 'RECHARGING' | 'MAINTENANCE' | 'DEFENDING';
  battery: number;
  location: { lat: number; lng: number; alt: number };
  heading: number;
  payload?: Payload;
}

export interface FlightPath {
  id: string;
  waypoints: { lat: number; lng: number; alt: number }[];
  eta: number;
  missionType: 'PATROL' | 'DELIVERY' | 'SURVEY' | 'INTERCEPT';
}

export interface Payload {
  id: string;
  weight: number;
  type: 'PACKAGE' | 'SENSOR' | 'DEFENSE_MODULE';
  status: 'STOWED' | 'DEPLOYED' | 'RELEASED';
}

export interface ThreatSignature {
  id: string;
  type: 'SIGNAL_JAMMER' | 'KINETIC' | 'DRONE_INTERCEPTOR';
  proximity: number;
  severity: number;
}
