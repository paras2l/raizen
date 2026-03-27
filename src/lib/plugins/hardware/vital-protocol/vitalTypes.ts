export type BiometricMetric = 'PULSE' | 'BREATH_RATE' | 'TEMPERATURE' | 'HRV' | 'PUPIL_DILATION';

export interface BiometricData {
  id: string;
  metric: BiometricMetric;
  value: number;
  unit: string;
  confidence: number; // 0 to 1
  timestamp: number;
}

export interface HealthAnomaly {
  id: string;
  metric: BiometricMetric;
  severity: 'MILD' | 'MODERATE' | 'CRITICAL';
  description: string;
  timestamp: number;
}

export interface StressProfile {
  level: number; // 0 to 10
  fatigueScore: number; // 0 to 100
  lastEvaluation: number;
}

export interface WellnessRecommendation {
  id: string;
  category: 'HAIBT' | 'MEDICAL' | 'HYDRATION' | 'REST';
  advice: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
