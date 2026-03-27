import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { MemoryCollector } from './collector';
import { KnowledgeIndexer } from './indexer';
import { VectorMemoryStore } from './store';
import { KnowledgeEvaluator } from './evaluator';
import { ParoModelManager } from './manager';
import { memoryLogger } from './logger';
import { MemoryConfig, MemorySource } from './types';

export class MemoryHarvestService implements RaizenPlugin {
  id = 'intelligence.memory-harvest';
  name = "Memory Harvest (Paro Core)";
  description = "God-Tier Personalized Intelligence: Continuously learns from your context to build an autonomous, offline-only AI called Paro.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private collector: MemoryCollector;
  private indexer: KnowledgeIndexer;
  private store: VectorMemoryStore;
  private evaluator: KnowledgeEvaluator;
  private paro: ParoModelManager;

  constructor(config: MemoryConfig) {
    this.collector = new MemoryCollector();
    this.indexer = new KnowledgeIndexer();
    this.store = new VectorMemoryStore();
    this.evaluator = new KnowledgeEvaluator(config.thresholdForParo);
    this.paro = new ParoModelManager();
  }

  actions: PluginAction[] = [
    {
      id: 'ingest_new_knowledge',
      label: 'Harvest Context',
      description: 'Manually feed data into the learning pipeline (docs, text, logs).',
      category: 'intelligence',
      sensitive: true
    },
    {
      id: 'query_paro_offline',
      label: 'Consult Paro (Offline)',
      description: 'Ask the autonomous local model for a retrieved-context response.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'get_intelligence_status',
      label: 'View Intelligence Maturity',
      description: 'Check Paro knowledge level and memory statistics.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'purge_memory_vault',
      label: 'Delete All Memories',
      description: 'Wipe the entire local knowledge base and reset Paro evolution.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[MEMORY-CORE] Autonomic Learning Active. Building Paro model...');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'ingest_new_knowledge':
          return await this.handleIngestion(params.source, params.content, auditEntry.id);
        case 'query_paro_offline':
          return await this.handleParoQuery(params.prompt, auditEntry.id);
        case 'get_intelligence_status':
          const maturity = this.evaluator.calculateMaturity(this.store.totalCount);
          return { success: true, data: { maturity, paroStatus: this.paro.status, logs: memoryLogger.getHistory() }, auditId: auditEntry.id };
        case 'purge_memory_vault':
          this.store.clearAll();
          memoryLogger.log({ event: 'PURGED', source: 'SYSTEM', details: 'Manual intelligence wipe.' });
          return { success: true, data: { status: 'Memory Wiped' }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handleIngestion(source: MemorySource, content: string, auditId: string): Promise<ActionResult> {
    const rawMemory = await this.collector.collect(source, content);
    memoryLogger.log({ event: 'INGESTED', source, details: `Entry size: ${content.length} chars` });

    const { entry, topics } = await this.indexer.index(rawMemory);
    await this.store.save(entry);
    
    this.evaluator.recordObservation(topics, source === 'document');
    
    // Check for Paro evolution
    const maturity = this.evaluator.calculateMaturity(this.store.totalCount);
    this.paro.updateStatus(maturity);

    memoryLogger.log({ 
      event: 'INDEXED', 
      source: entry.id, 
      details: `Topics: ${topics.join(', ')} | Maturity: ${(maturity.knowledgeRatio * 100).toFixed(1)}%` 
    });

    return { success: true, data: { memoryId: entry.id, topics, newMaturity: maturity.knowledgeRatio }, auditId };
  }

  private async handleParoQuery(prompt: string, auditId: string): Promise<ActionResult> {
    // 1. Retrieve context (simulated semantic search)
    const context = await this.store.search([], 3); 
    
    // 2. Query Paro
    const response = await this.paro.queryParo(prompt, context);
    
    memoryLogger.log({ event: 'SEARCHED', source: 'PARO', details: `Prompt: ${prompt}` });

    return { success: true, data: { response, offline: true }, auditId };
  }
}

// Singleton with safety defaults
export const memoryHarvest = new MemoryHarvestService({
  harvestingEnabled: true,
  thresholdForParo: 1000, 
  maxLocalSizeMb: 500
});
