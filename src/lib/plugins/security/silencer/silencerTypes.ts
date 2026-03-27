export interface JammingTarget {
  id: string;
  type: 'Wi-Fi' | 'Radio' | 'FM' | 'Bluetooth' | 'Cellular';
  frequency: string;
  signalStrength: number;
}

export interface JammingState {
  id: string;
  active: boolean;
  radiusKm: number;
  durationMs: number;
  startTime: number;
}

export interface PrivacyRisk {
  id: string;
  riskFactor: number; // 0.0 - 1.0
  description: string;
  optimizationsApplied: string[];
}

export interface SilencerAction {
  type: 'scan' | 'jam' | 'override' | 'status';
  payload: any;
}
