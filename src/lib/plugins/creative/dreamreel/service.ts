import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { dreamReelLogger } from './dreamReelLogger';
import { NeuralCaptureEngine } from './neuralCaptureEngine';
import { DreamDecodingModule } from './dreamDecodingModule';
import { CinematicSynthesisEngine } from './cinematicSynthesisEngine';
import { VisualAudioOrchestrator } from './visualAudioOrchestrator';
import { DreamReelSessionManager } from './dreamReelSessionManager';

export class DreamReelProtocolService implements RaizenPlugin {
  id = 'dreamreel-protocol';
  name = 'DreamReel Protocol';
  description = 'Brain-to-Cinema Neural Synthesis Suite';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'capture',
      label: 'Capture Brain-to-Cinema',
      description: 'Stream neural dream data for cinematic synthesis',
      category: 'creative',
      sensitive: true,
    },
    {
      id: 'synthesize',
      label: 'Synthesize Dream Cinema',
      description: 'Convert decoded dream scenes into photorealistic video',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'status',
      label: 'Production Status',
      description: 'View active cinema productions and neural frames',
      category: 'creative',
      sensitive: false,
    }
  ];

  private captureEngine = new NeuralCaptureEngine();
  private dencoder = new DreamDecodingModule();
  private synthesisEngine = new CinematicSynthesisEngine();
  private orchestrator = new VisualAudioOrchestrator();
  private sessionManager = new DreamReelSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    dreamReelLogger.log('DreamReel Protocol Initializing [GOD PRO MAX NEURAL CINEMA]');
    this.status = 'online';
    dreamReelLogger.success('Brain-to-Cinema Hub active. Subconscious imagery is now manifest.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'capture':
          const frames = await this.captureEngine.captureNeuralStream();
          const scene = await this.dencoder.decodeNeuralFrames(frames);
          this.sessionManager.registerScene(scene);
          return { success: true, data: scene };

        case 'synthesize':
          const scenes = this.sessionManager.getDecodedScenes();
          if (scenes.length === 0) {
            return { success: false, error: 'No decoded dream scenes available for synthesis.' };
          }
          
          const targetScene = scenes[scenes.length - 1];
          await this.orchestrator.orchestrate(targetScene);
          const output = await this.synthesisEngine.synthesizeCinema(targetScene);
          this.sessionManager.registerOutput(output);
          
          return { success: true, data: output };

        case 'status':
          return {
            success: true,
            data: {
              activeProductions: this.sessionManager.getActiveProductions().length,
              decodedScenes: this.sessionManager.getDecodedScenes().length,
            }
          };

        default:
          dreamReelLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      dreamReelLogger.error(`Cinema production failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    dreamReelLogger.log('DreamReel Protocol offline.');
  }
}

export const dreamReelProtocol = new DreamReelProtocolService();
