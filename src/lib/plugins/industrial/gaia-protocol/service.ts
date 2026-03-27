import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { SoilMonitoringEngine } from './soilMonitoringEngine';
import { WeatherPredictionModule } from './weatherPredictionModule';
import { InsectPopulationAnalyzer } from './insectPopulationAnalyzer';
import { IrrigationControlSystem } from './irrigationControlSystem';
import { NutrientDistributionScheduler } from './nutrientDistributionScheduler';
import { BioProfileOptimizer } from './bioProfileOptimizer';
import { GaiaSessionManager } from './gaiaSessionManager';
import { gaiaLogger } from './gaiaLogger';
import { GaiaConfig } from './gaiaConfig';

export class GaiaService implements RaizenPlugin {
  id = 'gaia-protocol';
  name = 'Gaia Protocol (Environmental Terraforming)';
  description = 'Absolute environmental mastery and coordinate biological terraforming via soil, weather, and nutrient orchestration.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private soilMonitor = new SoilMonitoringEngine();
  private weather = new WeatherPredictionModule();
  private insects = new InsectPopulationAnalyzer();
  private irrigation = new IrrigationControlSystem();
  private scheduler = new NutrientDistributionScheduler();
  private optimizer = new BioProfileOptimizer();
  private session = new GaiaSessionManager();

  actions: PluginAction[] = [
    {
      id: 'gaia-environment-status',
      label: '[GOD-LEVEL] Get Ecosystem Status',
      description: 'Retrieves real-time soil health, weather patterns, and irrigation queue status.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'gaia-trigger-terraforming',
      label: '[GOD-LEVEL] Initiate Terraforming Loop',
      description: 'Executes autonomous irrigation and nutrient titration across all zones.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'gaia-optimize-bio-profile',
      label: '[GOD-LEVEL] Sync Bio-Profile with Vitals',
      description: 'Optimizes ecosystem growth based on real-time physiological health data.',
      category: 'hardware',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await gaiaLogger.log('Initializing Gaia Protocol (Environmental Mastery)...');
    this.status = 'online';
    await gaiaLogger.log('Ecosystem terraforming master active. Monitoring via Version ' + GaiaConfig.GAIA_VERSION);
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    await gaiaLogger.log(`Executing environmental orchestration: ${actionId}`);

    switch (actionId) {
      case 'gaia-environment-status': {
        const weather = await this.weather.predict();
        this.session.setWeather(weather);
        
        const zoneId = params.zoneId || 'ESTATE_NORTH_A';
        const metric = await this.soilMonitor.scanZone(zoneId);
        this.session.updateZone(metric);
        
        return { success: true, data: { status: metric, weather, zones: this.session.getZones().length } };
      }

      case 'gaia-trigger-terraforming': {
        const zones = this.session.getZones();
        const insectHealth = await this.insects.analyzeHealth();
        await gaiaLogger.log(`Insect health sweep complete: ${insectHealth.join(', ')}`);
        
        for (const zone of zones) {
            if (zone.moistureLevel < GaiaConfig.THRESHOLDS.MOISTURE_MIN) {
                await this.irrigation.triggerIrrigation(zone, 50);
                await this.scheduler.dispense(zone.id, GaiaConfig.NUTRIENTS);
            }
        }
        return { success: true, data: { status: 'TERRAFORMING_LOOP_COMPLETE', zonesProcessed: zones.length } };
      }

      case 'gaia-optimize-bio-profile': {
        const vitalData = params.vitalData || { stressLevel: 0.2 }; // Bridge to VitalService
        const profile = await this.optimizer.optimizeForUser(vitalData);
        return { success: true, data: { profile, status: 'BIO_PROFILE_SYNCED' } };
      }

      default:
        return { success: true, data: { message: `Gaia Protocol ${actionId} initiated in background.` } };
    }
  }
}

export const gaiaProtocol = new GaiaService();
