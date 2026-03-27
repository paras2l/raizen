import { BiometricData, HealthAnomaly } from './vitalTypes';
import { VitalConfig } from './vitalConfig';
import { vitalLogger } from './vitalLogger';

export class AnomalyDetectionModule {
  public detect(data: BiometricData[]): HealthAnomaly[] {
    const anomalies: HealthAnomaly[] = [];

    data.forEach(metric => {
        if (metric.metric === 'PULSE' && (metric.value > VitalConfig.THRESHOLDS.PULSE.MAX || metric.value < VitalConfig.THRESHOLDS.PULSE.MIN)) {
            anomalies.push({
                id: `ANOM_${Date.now()}_PULSE`,
                metric: 'PULSE',
                severity: 'CRITICAL',
                description: `Sudden heart-rate shift detected: ${metric.value} BPM.`,
                timestamp: Date.now()
            });
        }
    });

    if (anomalies.length > 0) {
        vitalLogger.anomalyDetected(anomalies[0].metric, anomalies[0].severity);
    }

    return anomalies;
  }
}
