export type UIMood = 'STABLE' | 'CALM' | 'RESTORATIVE' | 'ALERT';

export interface BiometricData {
  heartRate: number;
  hrv: number;
  sleepQuality?: number;
  timestamp: number;
}

export interface StressLevel {
  score: number; // 0-1
  isSpike: boolean;
  trend: 'RISING' | 'STABLE' | 'FALLING';
}

export interface WellbeingSession {
  id: string;
  startTime: number;
  endTime?: number;
  initialStress: number;
  finalStress?: number;
}
