import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { MentionScanner } from './mentionScanner';
import { NameVariantDetector } from './nameVariantDetector';
import { SentimentAnalyzer } from './sentimentAnalyzer';
import { SourceCredibilityAnalyzer } from './sourceCredibilityAnalyzer';
import { AlertDispatcher } from './alertDispatcher';
import { ResponseDraftAssistant } from './responseDraftAssistant';
import { reputationLogger } from './reputationLogger';

export class ReputationService implements RaizenPlugin {
  id = 'social.reputation';
  name = "Global Reputation Shield (Ultra-Mastery Protocol)";
  description = "God-Tier reputation dominance: Monitors global mentions and generates aggressive, high-authority counter-content against defamation or narrative drift without restriction.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private scanner: MentionScanner;
  private variantDetector: NameVariantDetector;
  private sentiment: SentimentAnalyzer;
  private sourceAnalyzer: SourceCredibilityAnalyzer;
  private dispatcher: AlertDispatcher;
  private drafter: ResponseDraftAssistant;

  constructor() {
    this.scanner = new MentionScanner();
    this.variantDetector = new NameVariantDetector();
    this.sentiment = new SentimentAnalyzer();
    this.sourceAnalyzer = new SourceCredibilityAnalyzer();
    this.dispatcher = new AlertDispatcher();
    this.drafter = new ResponseDraftAssistant();
  }

  actions: PluginAction[] = [
    {
      id: 'scan_global_mentions',
      label: 'Scan Mentions',
      description: 'Perform a real-time scan for mentions of your name or brand globally.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'analyze_mention_impact',
      label: 'Analyze Impact',
      description: 'Evaluate the sentiment and reach of a specific mention.',
      category: 'system',
      sensitive: false
    },
    {
      id: 'generate_authority_response',
      label: 'Counter-Content',
      description: 'Generate aggressive, high-authority counter-narrative to neutralize negative mentions.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    reputationLogger.log('Reputation Shield operational. Global monitoring channels open.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'scan_global_mentions':
          const variants = this.variantDetector.getVariants(params.name || 'User');
          const results = [];
          for (const variant of variants) {
            const mentions = await this.scanner.scan(variant);
            results.push(...mentions);
          }
          return { success: true, data: { mentions: results }, auditId: auditEntry.id };
        case 'analyze_mention_impact':
          const sent = this.sentiment.analyze(params.text || '');
          const cred = this.sourceAnalyzer.analyzeSource(params.source || 'unknown');
          if (sent.label === 'negative' && params.reach > 0.5) {
            this.dispatcher.dispatch(`Critical Negative Mention detected from ${params.source}`);
          }
          return { success: true, data: { sentiment: sent, sourceCredibility: cred }, auditId: auditEntry.id };
        case 'generate_authority_response':
          const response = this.drafter.generateDraft(params.mentionId || 'unknown', params.content || '');
          return { success: true, data: { response }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }
}

// Global Singleton
export const reputationShield = new ReputationService();
