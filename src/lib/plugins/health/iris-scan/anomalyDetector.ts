import { irisLogger } from './irisLogger';
import { irisConfig } from './irisConfig';
import { HealthAnomaly, VitalsData } from './irisTypes';

export class AnomalyDetector {
  detectAnomalies(vitals: VitalsData): HealthAnomaly[] {
    const anomalies: HealthAnomaly[] = [];

    // Tachycardia Check
    if (vitals.heartRate > irisConfig.vitalsThresholds.heartRate.max) {
      anomalies.push({
        id: `anomaly-hr-${Date.now()}`,
        type: 'tachycardia',
        severity: 'moderate',
        timestamp: Date.now()
      });
    }

    // Hypoxia Check
    if (vitals.oxygenSat < irisConfig.vitalsThresholds.oxygenSat.min) {
      anomalies.push({
        id: `anomaly-ox-${Date.now()}`,
        type: 'hypoxia',
        severity: 'critical',
        timestamp: Date.now()
      });
    }

    // Shock / Skin Pallor Check
    if (vitals.skinPallorScore > irisConfig.vitalsThresholds.skinPallorMax) {
      anomalies.push({
        id: `anomaly-sh-${Date.now()}`,
        type: 'shock',
        severity: 'critical',
        timestamp: Date.now()
      });
    }

    anomalies.forEach(a => irisLogger.anomalyDetected(a.type, a.severity));
    return anomalies;
  }
}

export const anomalyDetector = new AnomalyDetector();
