import { BiometricData, StressProfile, HealthAnomaly } from './vitalTypes';
import { vitalLogger } from './vitalLogger';

export class VitalSessionManager {
  private metrics: BiometricData[] = [];
  private anomalies: HealthAnomaly[] = [];

  public logMetrics(data: BiometricData[]) {
    this.metrics.push(...data);
    // Keep last 100 entries
    if (this.metrics.length > 1000) this.metrics = this.metrics.slice(-1000);
  }

  public registerAnomaly(anomaly: HealthAnomaly) {
    this.anomalies.push(anomaly);
    vitalLogger.log(`Health anomaly registered: ${anomaly.description}`);
  }

  public getHistory() {
    return this.metrics.slice(-10);
  }

  public getActiveAnomalies() {
    return this.anomalies.slice(-5);
  }
}
