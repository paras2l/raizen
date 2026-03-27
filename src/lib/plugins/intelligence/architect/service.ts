import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { architectLogger } from './architectLogger';
import { ApplicationLearningEngine } from './applicationLearningEngine';
import { OmniLinkRemoteAccess } from './omniLinkRemoteAccess';
import { TaskExecutionOrchestrator } from './taskExecutionOrchestrator';
import { SoftwareSimulationModule } from './softwareSimulationModule';
import { ArchitectSessionManager } from './architectSessionManager';
import { ArchitectTask } from './architectTypes';

export class ArchitectProtocolService implements RaizenPlugin {
  id = 'architect-protocol';
  name = 'Architect Protocol';
  description = 'Multidimensional Knowledge Synthesis & Universal Software Orchestration';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'learn',
      label: 'Master Application',
      description: 'Study and learn to use any software (Ghost-User)',
      category: 'intelligence',
      sensitive: false,
    },
    {
      id: 'orchestrate',
      label: 'Orchestrate Task',
      description: 'Execute complex tasks through mastered software',
      category: 'intelligence',
      sensitive: true,
    },
    {
      id: 'status',
      label: 'Orchestration Status',
      description: 'View mastered apps and active tasks',
      category: 'intelligence',
      sensitive: false,
    }
  ];

  private learningEngine = new ApplicationLearningEngine();
  private omniLink = new OmniLinkRemoteAccess();
  private orchestrator = new TaskExecutionOrchestrator();
  private simulator = new SoftwareSimulationModule();
  private sessionManager = new ArchitectSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    architectLogger.log('Architect Protocol Initializing [GOD PRO MAX ORCHESTRATION]');
    this.status = 'online';
    architectLogger.success('Universal Software Orchestration Core active.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'learn':
          const app = await this.learningEngine.studyApp(params.appName);
          this.sessionManager.registerApp(app);
          return { success: true, data: app };

        case 'orchestrate':
          const task: ArchitectTask = {
            id: `TASK-${Date.now()}`,
            appId: params.appId,
            instruction: params.instruction,
            status: 'executing',
          };
          
          this.sessionManager.registerTask(task);
          
          // Use Omni-Link if remote specified or task is heavy
          if (params.useRemote) {
            await this.omniLink.connectToRemoteNode(params.nodeId || 'DEFAULT_COMPUTE');
          }
          
          const resultUri = await this.orchestrator.executeTask(task);
          await this.simulator.simulateOutput(task);
          
          task.status = 'completed';
          task.resultUri = resultUri;
          
          return { success: true, data: task };

        case 'status':
          return {
            success: true,
            data: {
              masteredApps: this.sessionManager.getMasteredApps(),
              activeTasks: this.sessionManager.getActiveTasks().length,
            }
          };

        default:
          architectLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      architectLogger.error(`Orchestration pipeline failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    architectLogger.log('Architect Protocol offline.');
  }
}

export const architectProtocol = new ArchitectProtocolService();
