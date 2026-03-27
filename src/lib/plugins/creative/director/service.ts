import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { directorLogger } from './directorLogger';
import { ScriptComposer } from './scriptComposer';
import { SceneOrchestrator } from './sceneOrchestrator';
import { DirectorSessionManager } from './directorSessionManager';
import { directorConfig } from './directorConfig';

export class DirectorProtocolService implements RaizenPlugin {
  id = 'director-protocol';
  name = 'Director Protocol';
  description = 'Multimodal Cinematic Synthesis & Living Scene Production';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'synthesize',
      label: 'Synthesize Cinematic Scene',
      description: 'Convert idea into multi-sensory cinematic short',
      category: 'creative',
      sensitive: true,
    },
    {
      id: 'status',
      label: 'Production Status',
      description: 'Monitor active render and synthesis jobs',
      category: 'creative',
      sensitive: false,
    }
  ];

  private scriptComposer = new ScriptComposer();
  private orchestrator = new SceneOrchestrator();
  private sessionManager = new DirectorSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    directorLogger.log('Director Protocol Initializing [GOD PRO MAX PRODUCTION]');
    this.status = 'online';
    directorLogger.success('Cinematic Sovereign Production Core Active.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'synthesize':
          const profile = (params.profile as keyof typeof directorConfig.profiles) || 'epic';
          const script = this.scriptComposer.compose(params.prompt);
          const scene = await this.orchestrator.synthesize(script, profile);
          this.sessionManager.registerJob(scene);
          return { success: true, data: scene };

        case 'status':
          return {
            success: true,
            data: {
              activeJobs: this.sessionManager.getActiveJobs().length,
              fidelity: directorConfig.audioFidelity,
            }
          };

        default:
          directorLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      directorLogger.error(`Production pipeline failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    directorLogger.log('Director Protocol production core offline.');
  }
}

export const directorProtocol = new DirectorProtocolService();
