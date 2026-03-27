import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { diplomatLogger } from './diplomatLogger';
import { LeaderProfileAnalyzer } from './leaderProfileAnalyzer';
import { NegotiationSimulationEngine } from './negotiationSimulationEngine';
import { BehavioralPredictionModel } from './behavioralPredictionModel';
import { WinningScriptGenerator } from './winningScriptGenerator';
import { DiplomatSessionManager } from './diplomatSessionManager';

export class DiplomatService implements RaizenPlugin {
  id = 'diplomat-protocol';
  name = 'Diplomat Protocol';
  description = 'Predictive Diplomacy & Behavioral Negotiation Modeling';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'simulate',
      label: 'Negotiation Simulation',
      description: 'Run simulation for a target leader and objective',
      category: 'intelligence',
      sensitive: true,
    },
    {
      id: 'profile',
      label: 'Leader Profiling',
      description: 'Generate psychological and historical profile',
      category: 'intelligence',
      sensitive: false,
    }
  ];

  private analyzer = new LeaderProfileAnalyzer();
  private engine = new NegotiationSimulationEngine();
  private behavioral = new BehavioralPredictionModel();
  private scriptGen = new WinningScriptGenerator();
  private sessions = new DiplomatSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    diplomatLogger.log('Diplomat Protocol Initializing [PREDICTIVE DIPLOMACY ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    diplomatLogger.success('Diplomat negotiation mirror ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      const { targetName, objective } = params;

      switch (actionId) {
        case 'simulate':
          if (!targetName || !objective) throw new Error('Missing targetName or objective');
          const profile = await this.analyzer.analyzeLeader(targetName);
          const scenario = await this.engine.runSimulations(profile, objective);
          const script = this.scriptGen.generateScript(profile, scenario);
          const predictions = this.behavioral.predictReactions(profile, scenario);
          
          this.sessions.saveScript(script);
          
          return {
            success: true,
            data: { profile, scenario, script, predictions }
          };

        case 'profile':
          if (!targetName) throw new Error('Missing targetName');
          const p = await this.analyzer.analyzeLeader(targetName);
          return { success: true, data: p };

        default:
          diplomatLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      diplomatLogger.error(`Diplomacy failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    diplomatLogger.log('Diplomat Protocol offline.');
  }
}

export const diplomatProtocol = new DiplomatService();
