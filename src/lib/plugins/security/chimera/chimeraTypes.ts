export type IllusionState = 'Dormant' | 'Active' | 'Projecting' | 'Compromised' | 'Vanished';
export type SpoofVector = 'GPS' | 'Wi-Fi' | 'Network-Triangulation' | 'IP-Stack';

export interface PresenceNode {
  id: string;
  country: string;
  city: string;
  ip: string;
  timezone: string;
  lat: number;
  lng: number;
  status: 'Sync' | 'Drift' | 'Offline';
}

export interface ChimeraAction {
  type: 'project' | 'rotate-nodes' | 'shroud' | 'reveal';
  payload: any;
}
