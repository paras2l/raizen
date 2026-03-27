import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { sovereignLogger } from './sovereignLogger';
import { ChameleonUI } from './chameleonUI';
import { AssetOverview } from './assetOverview';
import { TaskModeManager } from './taskModeManager';
import { FriendshipCore } from './friendshipCore';
import { SessionScheduler } from './sessionScheduler';
import { sovereignConfig } from './sovereignConfig';
import { TaskMode } from './sovereignTypes';

export class SovereignCommandService implements RaizenPlugin {
  id = 'system.sovereign';
  name = 'Sovereign Command';
  description = 'Empire Management Interface & Adaptive Control Center';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'sovereign-set-mode',
      label: 'Set Sovereign Mode',
      description: 'Morph the entire UI and prioritize resources for a specific task',
      category: 'system',
      sensitive: false,
    },
    {
      id: 'sovereign-asset-scan',
      label: 'Scan Empire Assets',
      description: 'Refresh real-time visibility across all digital and physical assets',
      category: 'system',
      sensitive: false,
    },
    {
      id: 'sovereign-friend-sync',
      label: 'Sync Friendship Core',
      description: 'Align Raizen with user preferences and emotional context',
      category: 'system',
      sensitive: false,
    },
    {
      id: 'sovereign-mission-start',
      label: 'Start Empire Mission',
      description: 'Begin a high-level strategic session with dedicated monitoring',
      category: 'system',
      sensitive: true,
    }
  ];

  private ui = new ChameleonUI();
  private assets = new AssetOverview();
  private tasks = new TaskModeManager();
  private friends = new FriendshipCore();
  private sessions = new SessionScheduler();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    sovereignLogger.log('Sovereign Command Initializing [EMPIRE INTERFACE ACTIVE]');
    this.status = 'online';
    await this.friends.syncHeart();
    sovereignLogger.success('Empire Management Interface ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'sovereign-set-mode':
          const mode = (params.mode as TaskMode) || 'Standby';
          await this.ui.morphInterface(mode);
          this.tasks.setMode(mode);
          return { success: true, data: { mode, insight: this.friends.getInsight() } };

        case 'sovereign-asset-scan':
          const assets = await this.assets.scanAssets();
          return { success: true, data: { assets } };

        case 'sovereign-friend-sync':
          await this.friends.syncHeart();
          return { success: true, data: { insight: this.friends.getInsight() } };

        case 'sovereign-mission-start':
          const title = params.title || 'New Empire Initiative';
          const mission = this.sessions.startMission(`M-${Date.now()}`, title, this.tasks.getActiveMode());
          return { success: true, data: { mission } };

        default:
          sovereignLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      sovereignLogger.error(`Sovereign command failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    sovereignLogger.log('Sovereign Command offline [REVERTING TO BASE UI].');
  }
}

export const sovereignCommand = new SovereignCommandService();
