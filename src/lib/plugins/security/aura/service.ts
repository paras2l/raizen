import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { auraLogger } from './auraLogger';
import { auraConfig } from './auraConfig';
import { EMFScanner } from './emfScanner';
import { DeviceIdentifierEngine } from './deviceIdentifierEngine';
import { ThreatMappingVisualizer } from './threatMappingVisualizer';
import { AlertManager } from './alertManager';
import { AuraSessionManager } from './auraSessionManager';

export class AuraSensorService implements RaizenPlugin {
  id = 'aura-sensor';
  name = 'Aura Sensor';
  description = 'Real-time EMF Detection & Surveillance Identification';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'scan',
      label: 'Deep EMF Scan',
      description: 'Perform 3D electromagnetic mapping of the vicinity',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'status',
      label: 'Security Overview',
      description: 'View current threat map and identified electronic signatures',
      category: 'security',
      sensitive: false,
    }
  ];

  private scanner = new EMFScanner();
  private identifier = new DeviceIdentifierEngine();
  private visualizer = new ThreatMappingVisualizer();
  private alerts = new AlertManager();
  private sessions = new AuraSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    auraLogger.log('Aura Sensor Initializing [EMF AWARENESS ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    auraLogger.success('Aura electronic defense suite ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'scan':
          const rawSignatures = await this.scanner.scanEnvironment();
          const identified = rawSignatures.map(s => this.identifier.identify(s));
          const map = this.visualizer.generateMap(identified);
          
          this.alerts.checkThreats(identified);
          this.sessions.logScan(map);
          
          return { success: true, data: { map, identifiedCount: identified.length } };

        case 'status':
          const history = this.sessions.getHistory();
          const lastMap = history[history.length - 1];
          return {
            success: true,
            data: {
              activeMonitoring: this.status === 'online',
              threatLevel: lastMap ? lastMap.threatLevel : 'None',
              lastScan: lastMap ? lastMap.timestamp : null,
            }
          };

        default:
          auraLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      auraLogger.error(`Sensing failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.sessions.endSession();
    this.status = 'offline';
    auraLogger.log('Aura Sensor offline.');
  }
}

export const auraSensor = new AuraSensorService();
