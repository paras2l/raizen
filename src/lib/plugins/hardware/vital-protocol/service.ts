import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { VisualThermalSensorEngine } from './visualThermalSensorEngine';
import { BiometricSignalProcessor } from './biometricSignalProcessor';
import { StressPatternAnalyzer } from './stressPatternAnalyzer';
import { AnomalyDetectionModule } from './anomalyDetectionModule';
import { HealthRecommendationSystem } from './healthRecommendationSystem';
import { VitalSessionManager } from './vitalSessionManager';
import { vitalLogger } from './vitalLogger';
import { VitalConfig } from './vitalConfig';

export class VitalService implements RaizenPlugin {
  id = 'vital-protocol';
  name = 'Vital Protocol (Health Overwatch)';
  description = 'Real-time non-invasive physiological monitoring and proactive wellness interventions via sensors and signal processing.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private sensors = new VisualThermalSensorEngine();
  private processor = new BiometricSignalProcessor();
  private stressAnalyzer = new StressPatternAnalyzer();
  private anomalyDetector = new AnomalyDetectionModule();
  private recommender = new HealthRecommendationSystem();
  private session = new VitalSessionManager();

  actions: PluginAction[] = [
    {
      id: 'vital-scan-ambient',
      label: '[GOD-LEVEL] Ambient Biometric Scan',
      description: 'Atomic-level non-invasive physiological scanning (Pulse, Breath, Temperature).',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'vital-get-wellness',
      label: 'Get Wellness Recommendations',
      description: 'Generates proactive health and habit shift advice based on current stress and fatigue patterns.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'vital-status-report',
      label: 'Get Physiology Status',
      description: 'Retrieves current health metrics and active physiological anomalies.',
      category: 'hardware',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await vitalLogger.log('Initializing Vital Protocol (Physiological Mastery)...');
    this.status = 'online';
    await vitalLogger.log('Ambient health overwatch active. Monitoring via Version ' + VitalConfig.VITAL_VERSION);
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    await vitalLogger.log(`Executing physiological orchestration: ${actionId}`);

    switch (actionId) {
      case 'vital-scan-ambient': {
        const rawData = await this.sensors.acquireRawData();
        const metrics = await this.processor.processStream(rawData);
        
        this.session.logMetrics(metrics);
        const anomalies = this.anomalyDetector.detect(metrics);
        anomalies.forEach(a => this.session.registerAnomaly(a));
        
        return { success: true, data: { metrics, anomalyCount: anomalies.length, status: 'SCAN_COMPLETE' } };
      }

      case 'vital-get-wellness': {
        const history = this.session.getHistory();
        const stress = await this.stressAnalyzer.analyzeHRV(history);
        const recs = this.recommender.generate(stress);
        
        return { success: true, data: { recommendations: recs, stressLevel: stress.level } };
      }

      case 'vital-status-report': {
        const history = this.session.getHistory();
        const anomalies = this.session.getActiveAnomalies();
        return { success: true, data: { recentMetrics: history, activeAnomalies: anomalies } };
      }

      default:
        return { success: true, data: { message: `Vital Protocol ${actionId} initiated in background.` } };
    }
  }
}

export const vitalProtocol = new VitalService();
