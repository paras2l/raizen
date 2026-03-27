import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { serenityLogger } from './serenityLogger';
import { stressMonitor } from './stressMonitor';
import { environmentAdjuster } from './environmentAdjuster';
import { notificationController } from './notificationController';
import { wellnessLogger } from './wellnessLogger';
import { cognitiveStabilizer } from './cognitiveStabilizer';
import { serenityConfig } from './serenityConfig';

export class SerenityProtocolService implements RaizenPlugin {
  id = 'health.serenity';
  name = 'Serenity-Protocol';
  description = 'Mental Health Attunement & Burnout Prevention';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'serenity-monitor-stress',
      label: 'Monitor Mental Stress',
      description: 'Analyze cognitive indicators like typing erraticism and task-switching',
      category: 'health',
      sensitive: false,
    },
    {
      id: 'serenity-adjust-environment',
      label: 'Adjust Environment',
      description: 'Proactively modify local lighting and soundscapes to stabilize focus',
      category: 'health',
      sensitive: false,
    },
    {
      id: 'serenity-log-wellness',
      label: 'Log Wellness Trends',
      description: 'Map long-term mental health and performance windows',
      category: 'health',
      sensitive: false,
    },
    {
      id: 'serenity-cognitive-stabilization',
      label: 'Cognitive Rewriting',
      description: 'Stabilize neural baselines and rewrite focus-lock for maximum calm',
      category: 'health',
      sensitive: true,
    },
    {
      id: 'serenity-status',
      label: 'Serenity Status',
      description: 'View current psychological load and intervention history',
      category: 'health',
      sensitive: false,
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'connecting';
    serenityLogger.log('Serenity Protocol Initializing [COGNITIVE FLOW ACTIVE]');
    this.status = 'online';
    serenityLogger.success('Mental Health Hub active. Psychological models synchronized.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'serenity-monitor-stress':
          const erraticism = params.erraticism || 0.15;
          const switching = params.switching || 2;
          const profile = stressMonitor.calculateStressLevel(erraticism, switching);
          return { success: true, data: { profile, status: profile.level === 'Low' ? 'STABLE' : 'UNSTABLE' } };

        case 'serenity-adjust-environment':
          const currentLevel = params.level || 'Low';
          const newState = environmentAdjuster.adjustEnvironment(currentLevel);
          notificationController.filterNotifications(currentLevel);
          return { success: true, data: { newState, status: 'STABILIZED' } };

        case 'serenity-log-wellness':
          const avgStress = params.averageStress || 'Low';
          const interventions = params.interventions || 0;
          const entry = wellnessLogger.logWellness(avgStress, interventions);
          return { success: true, data: { entry, history: wellnessLogger.getHistory().length } };

        case 'serenity-cognitive-stabilization':
          const stabilizationResult = await cognitiveStabilizer.stabilizeNeuralBaseline();
          return { success: true, data: { result: stabilizationResult } };

        case 'serenity-status':
          return {
            success: true,
            data: {
              monitoringInterval: serenityConfig.monitoringIntervalMs,
              focusModeActive: 'OPTIMAL',
              burnoutRisk: 'LOW',
              compliance: serenityConfig.complianceStandards
            }
          };

        default:
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      serenityLogger.error(`Serenity cycle failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    serenityLogger.log('Serenity Protocol offline.');
  }
}

export const serenityProtocol = new SerenityProtocolService();
