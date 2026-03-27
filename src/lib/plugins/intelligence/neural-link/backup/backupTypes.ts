export interface KnowledgeArtifact {
  id: string;
  name: string;
  type: 'DOC' | 'RESEARCH' | 'CODE' | 'NOTE';
  hash: string;
  timestamp: number;
}

export interface ActivityArchive {
  id: string;
  sessionId: string;
  artifacts: string[];
  duration: number;
}

export interface ContextSnapshot {
  id: string;
  files: string[];
  notes: string;
  meta: Record<string, any>;
}

export interface BackupState {
  healthy: boolean;
  lastSync: number;
  totalSize: number;
}
