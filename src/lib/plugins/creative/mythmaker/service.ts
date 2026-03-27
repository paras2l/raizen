import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { mythmakerLogger } from './mythmakerLogger';
import { LifeEventCapture } from './lifeEventCapture';
import { NarrativeSynthesisEngine } from './narrativeSynthesisEngine';
import { HeroJourneyMapper } from './heroJourneyMapper';
import { MythmakerSessionManager } from './mythmakerSessionManager';

export class MythmakerEngineService implements RaizenPlugin {
  id = 'mythmaker-engine';
  name = 'Mythmaker Engine';
  description = 'Infinite Storytelling & Life Legend Synthesis';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'capture-event',
      label: 'Capture Life Event',
      description: 'Log a daily activity or achievement for narrative processing',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'generate-legend',
      label: 'Synthesize Daily Legend',
      description: 'Convert daily events into an epic heroic narrative',
      category: 'creative',
      sensitive: false,
    },
    {
      id: 'status',
      label: 'Legend Status',
      description: 'View the current state of your heroic journey',
      category: 'creative',
      sensitive: false,
    }
  ];

  private eventCapture = new LifeEventCapture();
  private synthesisEngine = new NarrativeSynthesisEngine();
  private journeyMapper = new HeroJourneyMapper();
  private sessionManager = new MythmakerSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    mythmakerLogger.log('Mythmaker Engine Initializing [GOD PRO MAX STORYTELLING]');
    this.status = 'online';
    mythmakerLogger.success('Life Legend Synthesis Hub active. Your story is now being written.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'capture-event':
          const event = this.eventCapture.captureEvent(
            params.type || 'achievement',
            params.description || 'Manifested sovereign intent',
            params.impact || 0.5
          );
          return { success: true, data: event };

        case 'generate-legend':
          const events = this.eventCapture.getEvents();
          if (events.length === 0) {
            return { success: false, error: 'No life events captured for narrative synthesis.' };
          }
          
          const arc = await this.synthesisEngine.synthesizeLegend(events, params.style || 'epic');
          const stages = this.journeyMapper.mapEventsToJourney(events);
          
          this.sessionManager.updateLegend(arc);
          this.sessionManager.setCurrentJourney(stages);
          
          return { success: true, data: { arc, stages } };

        case 'status':
          return {
            success: true,
            data: {
              latestArc: this.sessionManager.getLatestArc(),
              journeyProgress: this.sessionManager.getJourneyStages().length,
            }
          };

        default:
          mythmakerLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      mythmakerLogger.error(`Legend synthesis failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    mythmakerLogger.log('Mythmaker Engine offline.');
  }
}

export const mythmakerEngine = new MythmakerEngineService();
