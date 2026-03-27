export interface ExperienceEntry {
  id: string;
  type: 'DOCUMENT' | 'WEB' | 'NOTE' | 'PROJECT';
  content: string;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface RecallContext {
  windowStart: number;
  windowEnd: number;
  relatedIds: string[];
  semanticCluster: string;
}

export interface MemoryMatch {
  id: string;
  score: number;
  entry: ExperienceEntry;
  reason: string;
}

export interface AssociationLink {
  sourceId: string;
  targetId: string;
  strength: number;
  commonality: string;
}
