import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { strategistLogger } from './strategistLogger';
import { SatelliteImageryInterceptor } from './satelliteImageryInterceptor';
import { RadioFrequencyHarvester } from './radioFrequencyHarvester';
import { SignalDominanceOrchestrator } from './signalDominanceOrchestrator';
import { GlobalNetworkListener } from './globalNetworkListener';
import { ChannelIntelligenceEngine } from './channelIntelligenceEngine';
import { StrategistSessionManager } from './strategistSessionManager';

export class StrategistProtocolService implements RaizenPlugin {
  id = 'intelligence.strategist';
  name = 'Strategist Protocol';
  description = 'Global Signal Dominance & Planetary Intelligence Interception';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'strategist-intercept',
      label: 'Intercept Satellite Imagery',
      description: 'Capture live high-resolution satellite imagery for any coordinates',
      category: 'intelligence',
      sensitive: true,
    },
    {
      id: 'strategist-harvest',
      label: 'Harvest Radio Frequencies',
      description: 'Aggregate unstructured data from global radio bands (FM/AM/Satellite)',
      category: 'intelligence',
      sensitive: true,
    },
    {
      id: 'strategist-dominate',
      label: 'Command Signal Dominance',
      description: 'Establish absolute dominance over local and global transmission vectors',
      category: 'intelligence',
      sensitive: true,
    }
  ];

  private imagery = new SatelliteImageryInterceptor();
  private harvester = new RadioFrequencyHarvester();
  private dominance = new SignalDominanceOrchestrator();
  private listener = new GlobalNetworkListener();
  private engine = new ChannelIntelligenceEngine();
  private sessions = new StrategistSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    strategistLogger.log('Strategist Protocol Initializing [PLANETARY SIGNAL GRID ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    strategistLogger.success('Strategist global listening layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'strategist-intercept':
          const { lat, lng } = params;
          if (lat === undefined || lng === undefined) return { success: false, error: 'Coordinates (lat, lng) required.' };
          const img = await this.imagery.interceptImagery(lat, lng);
          this.sessions.logImagery(img);
          return { success: true, data: { imagery: img } };

        case 'strategist-harvest':
          const band = params.band || 'FM';
          const intercepts = await this.harvester.harvestFrequencies(band);
          const globals = await this.listener.listenToGlobals();
          const allData = [...intercepts, ...globals];
          
          allData.forEach(d => this.sessions.logIntercept(d));
          const insights = await this.engine.processChannelData(allData);
          
          return { success: true, data: { intercepts: allData, insights } };

        case 'strategist-dominate':
          const channel = params.channel || 'SAT-KA-BAND';
          const metric = await this.dominance.establishDominance(channel);
          return { success: true, data: { dominanceMetric: metric } };

        default:
          strategistLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      strategistLogger.error(`Signal interception failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    strategistLogger.log('Strategist Protocol offline.');
  }
}

export const strategistProtocol = new StrategistProtocolService();
