import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { duetLogger } from './duetLogger';
import { duetConfig } from './duetConfig';
import { ActivityPredictor } from './activityPredictor';
import { RealTimeSynthesisEngine } from './realTimeSynthesisEngine';
import { MediumAdapter } from './mediumAdapter';
import { DuetSessionManager } from './duetSessionManager';
import { CreativeInput } from './duetTypes';

export class DuetProtocolService implements RaizenPlugin {
  id = 'duet-protocol';
  name = 'Duet Protocol';
  description = 'Live Artistic Collaboration & Real-Time Co-Creation Suite';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'duet',
      label: 'Perform Duet',
      description: 'Engage in a real-time artistic collaboration with Raizen',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'status',
      label: 'Collaboration Pulse',
      description: 'View active duet sessions and creative sync metrics',
      category: 'creative',
      sensitive: false,
    }
  ];

  private predictor = new ActivityPredictor();
  private synthesisEngine = new RealTimeSynthesisEngine();
  private adapter = new MediumAdapter();
  private sessionManager = new DuetSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    duetLogger.log('Duet Protocol Initializing [GOD PRO MAX LIVE COLLABORATION]');
    this.status = 'online';
    duetLogger.success('Artistic Duet Hub active. Real-time predictive stream ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'duet':
          const session = this.sessionManager.startSession(params.mode || 'Supportive');
          
          const input: CreativeInput = {
            userId: 'SOVEREIGN-USER',
            medium: params.medium || 'art',
            data: params.input || {},
            timestamp: Date.now(),
          };
          this.sessionManager.recordInput(session.id, input);
          
          const prediction = await this.predictor.predictNextMove(input);
          this.sessionManager.recordPrediction(session.id, prediction);
          
          const synthesis = await this.synthesisEngine.synthesizeOutput(prediction);
          const adaptedOutput = this.adapter.adaptOutput(synthesis, input.medium);
          
          return { success: true, data: { sessionId: session.id, aiContribution: adaptedOutput } };

        case 'status':
          return {
            success: true,
            data: {
              latencyTarget: duetConfig.latencyTargetMs,
              supportedMediums: duetConfig.supportedMediums,
            }
          };

        default:
          duetLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      duetLogger.error(`Collaboration failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    duetLogger.log('Duet Protocol offline.');
  }
}

export const duetProtocol = new DuetProtocolService();
