export type DeviceCategory = 'Camera' | 'Microphone' | 'GPS Tracker' | 'Smartphone' | 'Router' | 'Unknown';

export interface EMSignature {
  id: string;
  frequency: number; // in MHz
  intensity: number; // in dBm
  category: DeviceCategory;
  confidence: number; // 0.0 - 1.0
  coordinates: { x: number; y: number; z: number };
}

export interface ThreatMap {
  timestamp: number;
  signals: EMSignature[];
  threatLevel: 'Low' | 'Medium' | 'High' | 'CRITICAL';
}

export interface AuraAction {
  type: 'scan' | 'identify' | 'visualize' | 'status';
  payload: any;
}
