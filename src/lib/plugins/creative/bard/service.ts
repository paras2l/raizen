import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { bardLogger } from './bardLogger';
import { AvatarController } from './avatarController';
import { GameAIEngine } from './gameAIEngine';
import { CinematicSynthesis } from './cinematicSynthesis';
import { StoryNarrator } from './storyNarrator';
import { MediaLearningModule } from './mediaLearningModule';
import { GameStrategy } from './bardTypes';

export class BardProtocolService implements RaizenPlugin {
  id = 'creative.bard';
  name = 'Bard Protocol';
  description = 'Advanced Media Synthesis & Autonomous Gaming Avatar';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'bard-avatar-start',
      label: 'Start Gaming Avatar',
      description: 'Engage autonomous gameplay based on learned strategies',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'bard-cinematic-render',
      label: 'Render AI Cinematic',
      description: 'Synthesize a high-fidelity movie or trailer with full VFX',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'bard-narrate-story',
      label: 'Narrate Story',
      description: 'Transform text or books into immersive audio-visual experiences',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'bard-learn-tactics',
      label: 'Learn New Tactics',
      description: 'Ingest tutorials and gameplay videos to improve avatar performance',
      category: 'creative',
      sensitive: false,
    }
  ];

  private avatar = new AvatarController();
  private gameAI = new GameAIEngine();
  private cinematic = new CinematicSynthesis();
  private narrator = new StoryNarrator();
  private learning = new MediaLearningModule();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    bardLogger.log('Bard Protocol Initializing [CREATIVE CORE ACTIVE]');
    this.status = 'online';
    bardLogger.success('Creative sovereignty layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'bard-avatar-start':
          const title = params.gameTitle || 'Universal Sandbox';
          const strategy = await this.gameAI.studyGameplay(title);
          await this.avatar.initiateGameplay(strategy);
          return { success: true, data: { game: title, strategyId: strategy.id } };

        case 'bard-cinematic-render':
          const cineTitle = params.title || 'Empire Genesis';
          const project = await this.cinematic.renderMovie(cineTitle);
          return { success: true, data: { project } };

        case 'bard-narrate-story':
          const text = params.text || 'The Legend of Raizen...';
          const story = await this.narrator.narrate(text);
          return { success: true, data: { nodes: story.length } };

        case 'bard-learn-tactics':
          const url = params.url || 'https://youtube.com/pro-gameplay';
          const confidence = await this.learning.ingestTutorial(url);
          return { success: true, data: { confidence } };

        default:
          bardLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      bardLogger.error(`Bard production failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.avatar.stopGameplay();
    this.status = 'offline';
    bardLogger.log('Bard Protocol offline [STUDIO CLOSED].');
  }
}

export const bardProtocol = new BardProtocolService();
