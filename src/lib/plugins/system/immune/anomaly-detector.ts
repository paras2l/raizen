import { AnomalyReport } from './types';

export class AnomalyDetector {
  detect(moduleId: string, score: number): AnomalyReport | null {
    if (score < 0.3) {
      console.warn(`[IMMUNE-ALARM] Anomaly detected in module: ${moduleId}`);
      return {
        id: `anom_${Date.now()}`,
        moduleId,
        type: 'performance',
        severity: 'high',
        timestamp: new Date().toISOString()
      };
    }
    return null;
  }
}
