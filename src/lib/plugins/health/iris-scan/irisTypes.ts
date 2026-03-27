export interface VitalsData {
  heartRate: number; // bpm
  respiratoryRate: number; // breaths per min
  pupilDilation: number; // 0-1
  skinPallorScore: number; // 0-1 (low is healthy)
  oxygenSat: number; // SpO2 estimate
}

export interface HealthAnomaly {
  id: string;
  type: 'shock' | 'hypoxia' | 'cardiac-distress' | 'tachycardia';
  severity: 'moderate' | 'critical' | 'fatal';
  timestamp: number;
}

export interface TriageReport {
  id: string;
  vitals: VitalsData;
  anomalies: HealthAnomaly[];
  status: 'transmitting' | 'received' | 'archived';
}

export interface IrisAction {
  type: 'measure-vitals' | 'detect-anomaly' | 'notify-emergency' | 'generate-triage';
  payload: any;
}
