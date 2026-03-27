export type ContextType = 'topic' | 'environment' | 'conversation' | 'document' | 'mission';
export type KnowledgeSource = 'local_memory' | 'vector_store' | 'web_api' | 'research_db' | 'document_lib';

export interface ContextSnapshot {
  id: string;
  type: ContextType;
  subject: string;
  confidence: number;
  timestamp: string;
  summary: string;
  keyFacts: string[];
  entities: string[];
  sources: KnowledgeSource[];
}

export interface InjectionPayload {
  snapshotId: string;
  injectedPrompt: string;
  priority: 'high' | 'normal' | 'low';
}

export interface ContextConfig {
  enabledSources: KnowledgeSource[];
  minConfidenceThreshold: number;
  maxCacheEntries: number;
  localOnlyMode: boolean;
}

export interface ContextLogEntry {
  timestamp: string;
  event: 'DETECT' | 'RETRIEVE' | 'SYNTHESIZE' | 'INJECT' | 'CACHE_HIT';
  details: string;
}
