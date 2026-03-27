import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { legisLogger } from './legisLogger';
import { LegislativePatternAnalyzer } from './legislativePatternAnalyzer';
import { PoliticalTrendScanner } from './politicalTrendScanner';
import { LawForecastEngine } from './lawForecastEngine';
import { EarlyAlertNotifier } from './earlyAlertNotifier';
import { LegisSessionManager } from './legisSessionManager';
import { Jurisdiction } from './legisTypes';

export class LegisProtocolService implements RaizenPlugin {
  id = 'legis-protocol';
  name = 'Legis Protocol';
  description = 'Predictive Legal Intelligence & Global Law Forecasting';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'forecast',
      label: 'Regulatory Forecast',
      description: 'Generate 6-month predictive law report for a jurisdiction',
      category: 'intelligence',
      sensitive: true,
    },
    {
      id: 'scan',
      label: 'Trend Scan',
      description: 'Identify emerging political narratives and regulatory agendas',
      category: 'intelligence',
      sensitive: false,
    }
  ];

  private analyzer = new LegislativePatternAnalyzer();
  private scanner = new PoliticalTrendScanner();
  private engine = new LawForecastEngine();
  private notifier = new EarlyAlertNotifier();
  private sessions = new LegisSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    legisLogger.log('Legis Protocol Initializing [LEGAL FORESIGHT ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    legisLogger.success('Legis law-rewrite alert layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      const jurisdiction: Jurisdiction = params.jurisdiction || 'GLOBAL';

      switch (actionId) {
        case 'forecast':
          await this.analyzer.analyzePatterns(jurisdiction);
          const trends = await this.scanner.scanTrends(jurisdiction);
          const laws = await this.engine.generateForecast(jurisdiction, trends);
          
          this.sessions.logForecasts(laws);
          laws.forEach(law => this.notifier.sendAlert(law));
          
          return {
            success: true,
            data: { jurisdiction, laws, trends, timeHorizon: '6 Months' }
          };

        case 'scan':
          const t = await this.scanner.scanTrends(jurisdiction);
          return { success: true, data: { trends: t } };

        default:
          legisLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      legisLogger.error(`Legislative analysis failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    legisLogger.log('Legis Protocol offline.');
  }
}

export const legisProtocol = new LegisProtocolService();
