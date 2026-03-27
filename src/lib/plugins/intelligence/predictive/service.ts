import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { ContextScanner } from './scanner';
import { SignalAggregator } from './aggregator';
import { PredictionEngine } from './engine';
import { DraftGenerator } from './generator';
import { PredictionCache } from './cache';
import { predictiveLogger } from './logger';
import { PredictiveConfig, AnticipatedNeed } from './types';

export class PredictiveIntelligenceService implements RaizenPlugin {
  id = 'intelligence.predictive';
  name = "Predictive Intelligence Engine (Oracle)";
  description = "God-Tier Proactive AI: Anticipates user needs by scanning calendar, email, and task signals to prepare drafts and research in advance.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private scanner: ContextScanner;
  private aggregator: SignalAggregator;
  private engine: PredictionEngine;
  private generator: DraftGenerator;
  private cache: PredictionCache;
  private scanTimer: any = null;

  constructor(config: PredictiveConfig) {
    this.scanner = new ContextScanner(config.enabledSources);
    this.aggregator = new SignalAggregator();
    this.engine = new PredictionEngine(config.minConfidenceThreshold);
    this.generator = new DraftGenerator();
    this.cache = new PredictionCache(config.maxCacheSize);
  }

  actions: PluginAction[] = [
    {
      id: 'trigger_manual_scan',
      label: 'Run Anticipatory Scan',
      description: 'Force a foreground scan across all signals to prepare immediate intelligence.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'get_cached_predictions',
      label: 'View Prepared Insights',
      description: 'Check what drafts and research briefs Raizen has already prepared.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'clear_prediction_cache',
      label: 'Flush Oracle Cache',
      description: 'Clear all pre-computed drafts and research from the temporary store.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[ORACLE] Intuition Engine Pulsing. Scanning background signals...');
    this.startBackgroundLoop();
  }

  private startBackgroundLoop() {
    if (this.scanTimer) clearInterval(this.scanTimer);
    this.scanTimer = setInterval(() => {
      this.runAnticipatoryCycle().catch(e => console.error('[ORACLE] Background cycle failed:', e));
    }, 120000); // Scans every 2 minutes (Idle-Cycle compatible)
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'trigger_manual_scan':
          await this.runAnticipatoryCycle();
          return { success: true, data: { status: 'Scan Complete', predictionsFound: this.cache.getAll().length }, auditId: auditEntry.id };
        case 'get_cached_predictions':
          return { success: true, data: { prepared: this.cache.getAll(), logs: predictiveLogger.getHistory() }, auditId: auditEntry.id };
        case 'clear_prediction_cache':
          this.cache.clear();
          predictiveLogger.log({ event: 'PURGE', details: 'Manual cache flush.' });
          return { success: true, data: { status: 'Cache Cleared' }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async runAnticipatoryCycle() {
    // 1. Scan for signals
    const signals = await this.scanner.scan();
    if (signals.length > 0) {
      predictiveLogger.log({ event: 'SIGNAL_CAP', details: `Captured ${signals.length} contextual signals.` });
    }

    // 2. Aggregate and group
    const clusters = this.aggregator.aggregate(signals);

    // 3. Score and predict
    const needs = this.engine.generatePredictions(clusters);

    // 4. Generate and cache high-confidence needs
    for (const need of needs) {
      if (!this.cache.get(need.id)) {
        const result = await this.generator.generate(need);
        this.cache.store(result);
        predictiveLogger.log({ event: 'PREDICTION_MADE', details: `Need detected: ${need.type} | Conf: ${need.confidence}` });
      }
    }
  }
}

// Singleton with proactive defaults
export const predictiveIntelligence = new PredictiveIntelligenceService({
  scanIntervalMs: 120000,
  minConfidenceThreshold: 0.75,
  enabledSources: ['calendar', 'email', 'file', 'task'],
  maxCacheSize: 100
});
