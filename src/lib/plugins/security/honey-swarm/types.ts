export interface DecoyVolume {
  id: string;
  path: string;
  mimicType: 'financial' | 'personal' | 'system' | 'research';
  deployedAt: string;
}

export interface SyntheticFile {
  name: string;
  type: string;
  size: number;
  baitLevel: number; // 1-10
}

export interface AccessEvent {
  volumeId: string;
  timestamp: string;
  action: 'list' | 'read' | 'write' | 'delete' | 'execute';
  fileAffected?: string;
  processId?: number;
}

export interface IntrusionInsight {
  attackerIntent: 'casual' | 'targeted' | 'automated';
  persistenceScore: number;
  navigationDepth: number;
}

export interface HoneySwarmConfig {
  maxDecoyVolumes: number;
  autoRegenerateDecoys: boolean;
  alertOnFirstTouch: boolean;
}
