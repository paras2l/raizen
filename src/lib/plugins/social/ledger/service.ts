import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { InteractionEventTracker } from './interactionEventTracker';
import { ValueExchangeRecorder } from './valueExchangeRecorder';
import { RelationshipBalanceEngine } from './relationshipBalanceEngine';
import { FavorOpportunityDetector } from './favorOpportunityDetector';
import { BridgeBuildingAdvisor } from './bridgeBuildingAdvisor';
import { StrategicReminderEngine } from './strategicReminderEngine';
import { ledgerLogger } from './ledgerLogger';

export class LedgerService implements RaizenPlugin {
  id = 'social.ledger';
  name = "Legacy Ledger (Social Capital Optimizer)";
  description = "God-Tier relationship intelligence: Tracks favors, referrals, and value exchanges to maximize long-term social capital.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private tracker: InteractionEventTracker;
  private recorder: ValueExchangeRecorder;
  private balancer: RelationshipBalanceEngine;
  private detector: FavorOpportunityDetector;
  private advisor: BridgeBuildingAdvisor;
  private reminders: StrategicReminderEngine;

  constructor() {
    this.tracker = new InteractionEventTracker();
    this.recorder = new ValueExchangeRecorder();
    this.balancer = new RelationshipBalanceEngine();
    this.detector = new FavorOpportunityDetector();
    this.advisor = new BridgeBuildingAdvisor();
    this.reminders = new StrategicReminderEngine();
  }

  actions: PluginAction[] = [
    {
      id: 'record_social_event',
      label: 'Record Interaction',
      description: 'Log a meaningful interaction or favor with a contact.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'check_relationship_balance',
      label: 'Audit Capital',
      description: 'Analyze the value-exchange balance for a specific relationship.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'get_favor_opportunities',
      label: 'Locate Edges',
      description: 'Identify contacts where you have a value surplus and can ask for help.',
      category: 'system',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    ledgerLogger.log('Legacy Ledger active. Social capital tracking synchronized.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'record_social_event':
          const evt = await this.tracker.record(params.contactId || 'unknown', params.type || 'collaboration', params.description || '');
          this.recorder.recordExchange(params.contactId, params.gave || '', params.received || '');
          return { success: true, data: { event: evt }, auditId: auditEntry.id };
        case 'check_relationship_balance':
          const status = this.balancer.analyze(params.contactId || 'unknown', []);
          const advice = this.advisor.suggest(params.contactId, status.state === 'deficit');
          return { success: true, data: { status, advisorNote: advice }, auditId: auditEntry.id };
        case 'get_favor_opportunities':
          const op = this.detector.detect(params.contactId || 'unknown', 'surplus');
          const reminder = this.reminders.generate(params.contactId || 'unknown');
          return { success: true, data: { opportunity: op, reminder }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }
}

// Global Singleton
export const ledger = new LedgerService();
