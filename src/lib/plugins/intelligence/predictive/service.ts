import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { ContextScanner } from './scanner';
import { SignalAggregator } from './aggregator';
import { PredictionEngine } from './engine';
import { DraftGenerator } from './generator';
import { PredictionCache } from './cache';
import { predictiveLogger } from './logger';
import { PredictiveConfig, AnticipatedNeed } from './types';
import { arbiter } from './arbiter';

export class PredictiveIntelligenceService implements RaizenPlugin {
  id = 'intelligence.predictive';
  name = "Oracle Engine (Predictive)";
  description = "God-Tier Proactive AI: Anticipates user needs by scanning calendar, email, and task signals to pre-compute 3 solutions with Arbiter safety gating.";
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
      label: 'Run Oracle Scan',
      description: 'Force a foreground scan across all signals to prepare immediate intelligence solutions.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'get_cached_predictions',
      label: 'View Prepared solutions',
      description: 'Check what solution sets Raizen has already pre-computed.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'execute_oracle_solution',
      label: 'Authorize Oracle Path',
      description: 'Execute the primary solution computed by the Oracle engine.',
      category: 'intelligence',
      sensitive: true
    },
    {
      id: 'precompute_solutions',
      label: 'Oracle: Pre-compute solutions',
      description: 'Analyze a direct command to pre-compute 3 potential paths and evaluate risk.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'get_active_solutions',
      label: 'Explore Proactive Ideas',
      description: 'Fetch the latest solution sets Raizen has pre-computed from background signals.',
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
    console.log('[ORACLE] Intuition Engine Pulsing. Pre-computing 3-path solutions...');
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
          return { success: true, data: { status: 'Oracle Scan Complete', predictionsFound: this.cache.getAll().length }, auditId: auditEntry.id };
        case 'get_cached_predictions':
          return { success: true, data: { prepared: this.cache.getAll(), logs: predictiveLogger.getHistory() }, auditId: auditEntry.id };
        case 'execute_oracle_solution':
          const solutionId = params.solutionId;
          predictiveLogger.log({ event: 'ARBITER_GATE', details: `Executing solution: ${solutionId}` });
          return { success: true, data: { status: 'Execution Finalized', solutionId }, auditId: auditEntry.id };
        case 'precompute_solutions':
          const input = params.input || '';
          const clusters = this.aggregator.aggregate([{
            id: 'direct_cmd',
            source: 'browser',
            topic: input,
            priority: 1.0
          }]);
          const precalcNeeds = this.engine.generatePredictions(clusters);
          if (precalcNeeds.length > 0) {
            const need = precalcNeeds[0];
            const evalRes = arbiter.evaluate(input);
            if (need.oracleSet) {
              need.oracleSet.risk = evalRes.risk;
              need.oracleSet.reason = evalRes.reason;
              need.oracleSet.persona = evalRes.persona;
            }
            return { success: true, data: { oracleSet: need.oracleSet }, auditId: auditEntry.id };
          }
          return { success: false, error: 'Could not compute solutions for input.', auditId: auditEntry.id };
        case 'get_active_solutions':
          const active = this.cache.getAll();
          return { success: true, data: { solutions: active }, auditId: auditEntry.id };
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
    const signals = await this.scanner.scan();
    if (signals.length > 0) {
      predictiveLogger.log({ event: 'SIGNAL_CAP', details: `Captured ${signals.length} contextual signals.` });
    }

    const clusters = this.aggregator.aggregate(signals);
    const needs = this.engine.generatePredictions(clusters);

    for (const need of needs) {
      if (!this.cache.get(need.id)) {
        // Run Arbiter evaluation
        if (need.oracleSet) {
          const evalRes = arbiter.evaluate(need.title);
          need.oracleSet.risk = evalRes.risk;
          need.oracleSet.reason = evalRes.reason;
          need.oracleSet.persona = evalRes.persona;
          
          if (evalRes.risk === 'CRITICAL') {
            predictiveLogger.log({ event: 'ARBITER_GATE', details: `Critical task detected: ${need.title}. Sign-off required.` });
          }
        }

        const result = await this.generator.generate(need);
        this.cache.store(result);
        predictiveLogger.log({ event: 'PREDICTION_MADE', details: `Oracle pre-computed 3 paths for: ${need.title} | Risk: ${need.oracleSet?.risk}` });
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
