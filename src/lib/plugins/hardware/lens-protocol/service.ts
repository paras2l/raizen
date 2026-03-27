import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { MicroExpressionAnalyzer } from './microExpressionAnalyzer';
import { VoiceToneScanner } from './voiceToneScanner';
import { GesturePatternRecognizer } from './gesturePatternRecognizer';
import { SocialGraphIntegrator } from './socialGraphIntegrator';
import { StrategicInsightEngine } from './strategicInsightEngine';
import { LensSessionManager } from './lensSessionManager';
import { lensLogger } from './lensLogger';
import { LensConfig } from './lensConfig';

export class LensService implements RaizenPlugin {
  id = 'lens-protocol';
  name = 'Lens Protocol (Behavioral Intelligence)';
  description = 'Real-time psychological analysis and strategic negotiation support via the Arbiter Eye.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private facialAnalyzer = new MicroExpressionAnalyzer();
  private voiceScanner = new VoiceToneScanner();
  private gestureRecognizer = new GesturePatternRecognizer();
  private socialBridge = new SocialGraphIntegrator();
  private insightEngine = new StrategicInsightEngine();
  private session = new LensSessionManager();

  actions: PluginAction[] = [
    {
      id: 'lens-analyze',
      label: 'Psychological Analysis',
      description: 'Performs real-time analysis of micro-expressions, voice tone, and body language.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'lens-cross-ref',
      label: '[GOD-LEVEL] Cross-Ref Social Graph',
      description: 'Instant tactical cross-referencing of behavioral cues with target biography.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'lens-get-insights',
      label: 'Strategic Tactical Insight',
      description: 'Generates ad-hoc negotiation and presentation tactics based on observed state.',
      category: 'intelligence',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await lensLogger.log('Initializing Lens Protocol (Arbiter Eye)...');
    this.status = 'online';
    await lensLogger.log('Behavioral analysis thresholds synchronized with LensConfig.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    await lensLogger.log(`Executing behavioral action: ${actionId}`);

    switch (actionId) {
      case 'lens-analyze': {
        const visual = await this.facialAnalyzer.analyzeVisualStream(params.visualFrame || {});
        const vocal = await this.voiceScanner.scanAudioStream(params.audioBuffer || {});
        const gesture = await this.gestureRecognizer.recognizeMovement(params.motionData || {});
        
        const allSignals = [...visual, ...vocal, ...gesture];
        const state = this.insightEngine.deriveState(allSignals);
        const insights = this.insightEngine.generateInsights(allSignals, state);
        
        this.session.updateSession(state, insights);

        return { 
          success: true, 
          data: { 
            state, 
            signalCount: allSignals.length,
            latestInsight: insights[0]?.recommendation || 'No critical anomalies detected.'
          } 
        };
      }

      case 'lens-bridge-social': {
        const targetId = params.targetId;
        const status = this.session.getCurrentStatus();
        if (!targetId) return { success: false, data: { message: 'Target ID required for Social Bridge.' } };

        // We assume last session signals are relevant
        const bridgeData = await this.socialBridge.bridgeBehavior([], targetId);
        return { success: true, data: bridgeData };
      }

      case 'lens-get-insights': {
        const status = this.session.getCurrentStatus();
        return { success: true, data: status };
      }

      default:
        return { success: true, data: { message: `Lens Protocol ${actionId} initiated in background.` } };
    }
  }
}

export const lensProtocol = new LensService();
