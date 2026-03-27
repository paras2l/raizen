export interface EmergencySignal {
  id: string;
  source: 'voice' | 'movement' | 'panic_trigger' | 'inactivity';
  severity: number; // 0.0 to 1.0
  timestamp: string;
}

export interface RiskAssessment {
  probability: number;
  classification: string;
  contributingFactors: string[];
}

export interface AlertState {
  active: boolean;
  status: 'monitoring' | 'confirming' | 'alerting' | 'resolved';
  lastCheck?: string;
}

export interface SensorData {
  accelerometer: { x: number; y: number; z: number };
  gps: { lat: number; lng: number };
  audioDistressDetected: boolean;
}

export interface ResponderInfo {
  name: string;
  relation: string;
  contactMethod: 'sms' | 'push' | 'email';
  address: string;
}

export interface LifeLineConfig {
  voiceDistressEnabled: boolean;
  inactivityThresholdMs: number;
  autoBeaconOnAlert: boolean;
}
