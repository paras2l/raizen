import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { aegisLogger } from './aegisLogger';
import { crisisPredictor } from './crisisPredictor';
import { safeHavenAllocator } from './safeHavenAllocator';
import { alertDispatcher } from './alertDispatcher';
import { postEventLogger } from './postEventLogger';
import { aegisConfig } from './aegisConfig';

export class AegisLayerService implements RaizenPlugin {
  id = 'finance.aegis';
  name = 'Aegis-Layer';
  description = 'Predictive Crisis Shield & Global Market Defense Suite';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'aegis-predict-crash',
      label: 'Predict Market Crash',
      description: 'Analyze global signals to detect financial instability with 48-hour lead time',
      category: 'financial',
      sensitive: false,
    },
    {
      id: 'aegis-relocate-assets',
      label: 'Relocate to Safe Havens',
      description: 'Automatically move assets into Gold, Crypto, Land, or Offshore structures',
      category: 'financial',
      sensitive: true,
    },
    {
      id: 'aegis-audit-events',
      label: 'Audit Defense Events',
      description: 'View history of predicted crises and automated defense outcomes',
      category: 'financial',
      sensitive: false,
    },
    {
      id: 'aegis-status',
      label: 'Aegis Status',
      description: 'View current risk indicators and defense readiness state',
      category: 'financial',
      sensitive: false,
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'connecting';
    aegisLogger.log('Aegis Layer Initializing [PREDICTIVE DEFENSE ACTIVE]');
    this.status = 'online';
    aegisLogger.success('Global Crisis Shield Hub active. Predictive models synchronized.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'aegis-predict-crash':
          const event = crisisPredictor.analyzeSignals();
          if (event) {
            alertDispatcher.dispatch(event);
            if (aegisConfig.autoRelocate) {
               this.execute('aegis-relocate-assets', { event, wealth: params.wealth || 10000000 });
            }
          }
          return { success: true, data: { crisisDetected: !!event, event } };

        case 'aegis-relocate-assets':
          const currentEvent = params.event || crisisPredictor.analyzeSignals();
          if (!currentEvent) return { success: false, error: 'No active crisis event detected for relocation.' };
          
          const allocations = safeHavenAllocator.allocate(currentEvent, params.wealth || 10000000);
          postEventLogger.logEventResult(currentEvent.id, 'SHIELDED', { allocations });
          return { success: true, data: { allocations, status: 'SHIELDED' } };

        case 'aegis-audit-events':
          return { success: true, data: { history: postEventLogger.getHistory() } };

        case 'aegis-status':
          return {
            success: true,
            data: {
              activeMonitoring: true,
              predictionHorizon: `${aegisConfig.predictionHorizonHours}h`,
              defenseReadiness: 'OPTIMAL',
              riskScore: crisisPredictor.analyzeSignals()?.probability || 0.15
            }
          };

        default:
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      aegisLogger.error(`Aegis cycle failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    aegisLogger.log('Aegis Layer offline.');
  }
}

export const aegisLayer = new AegisLayerService();
