export type MemorySource = 'conversation' | 'document' | 'code' | 'web' | 'task' | 'note';

export interface MemoryEntry {
  id: string;
  timestamp: string;
  source: MemorySource;
  content: string;
  context: Record<string, any>;
  embedding?: number[];
}

export interface KnowledgeTopic {
  label: string;
  confidence: number;
  lastEncountered: string;
  hitCount: number;
}

export interface MaturityScore {
  totalMemories: number;
  topicsLearned: number;
  documentsIndexed: number;
  knowledgeRatio: number; // 0.0 to 1.0 (threshold for Paro)
}

export interface MemoryConfig {
  harvestingEnabled: boolean;
  encryptionKey?: string;
  thresholdForParo: number; // e.g. 1000 memories
  maxLocalSizeMb: number;
}

export interface MemoryLogEntry {
  timestamp: string;
  event: 'INGESTED' | 'INDEXED' | 'PURGED' | 'SEARCHED' | 'THRESHOLD_REACHED';
  source: string;
  details: string;
}
