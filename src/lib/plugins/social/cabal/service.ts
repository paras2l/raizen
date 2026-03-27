import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { cabalLogger } from './cabalLogger';
import { SocialGraphAnalyzer } from './socialGraphAnalyzer';
import { InfluenceRanker } from './influenceRanker';
import { HiddenNetworkScanner } from './hiddenNetworkScanner';
import { StrategyAdvisor } from './strategyAdvisor';
import { CabalSessionManager } from './cabalSessionManager';

export class CabalProtocolService implements RaizenPlugin {
  id = 'cabal-protocol';
  name = 'Cabal Protocol';
  description = 'Influence Mapping & Hidden Power Detection';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'map',
      label: 'Map Influence',
      description: 'Generate power map for any city to identify true decision-makers',
      category: 'social',
      sensitive: true,
    },
    {
      id: 'advise',
      label: 'Get Advice',
      description: 'Get strategic engagement tactics for a specific actor',
      category: 'social',
      sensitive: true,
    }
  ];

  private analyzer = new SocialGraphAnalyzer();
  private ranker = new InfluenceRanker();
  private scanner = new HiddenNetworkScanner();
  private advisor = new StrategyAdvisor();
  private sessions = new CabalSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    cabalLogger.log('Cabal Protocol Initializing [NETWORK SCANNING ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    cabalLogger.success('Cabal hidden influence layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      const city: string = params.city || 'GLOBAL';

      switch (actionId) {
        case 'map':
          const { actors, edges } = await this.analyzer.analyzeNetwork(city);
          const hiddenEdges = this.scanner.detectCovertAlliances(actors, edges);
          const map = this.ranker.generateMap(city, actors, [...edges, ...hiddenEdges]);
          
          this.sessions.logMap(map);
          return {
            success: true,
            data: { map, analysisLevel: 'DEEP' }
          };

        case 'advise':
          const actorId = params.actorId;
          const currentMap = this.sessions.getMap(city);
          const actor = currentMap?.topBrokers.find(a => a.id === actorId);
          
          if (!actor) return { success: false, error: 'Actor not found in current session map.' };
          
          const advice = this.advisor.generateAdvice(actor);
          return { success: true, data: { actor, advice } };

        default:
          cabalLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      cabalLogger.error(`Influence mapping failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    cabalLogger.log('Cabal Protocol offline.');
  }
}

export const cabalProtocol = new CabalProtocolService();
