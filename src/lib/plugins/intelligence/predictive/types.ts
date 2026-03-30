export type SignalSource = 'calendar' | 'email' | 'file' | 'task' | 'browser';
export type PredictionType = 'email_draft' | 'meeting_brief' | 'research' | 'task_suggestion' | 'agenda_notes';

export interface ContextSignal {
  id: string;
  source: SignalSource;
  topic: string;
  time?: string;
  participants?: string[];
  content?: string;
  priority: number;
}

export interface OracleSolution {
  id: string;
  label: string;
  content: string;
  confidence: number;
  isOptimal: boolean;
  actionPayload?: Record<string, any>;
}

export interface OracleSet {
  primary: OracleSolution;
  alternatives: OracleSolution[]; // Exactly 2
  risk: 'NORMAL' | 'CRITICAL';
  reason?: string;
  persona?: 'ASSISTANT' | 'GUARDIAN' | 'SCHOLAR' | 'MIMIC';
}

export interface AnticipatedNeed {
  id: string;
  type: PredictionType;
  title: string;
  confidence: number;
  signals: string[]; // IDs of source signals
  reasons: string[];
  oracleSet?: OracleSet;
}

export interface PredictiveConfig {
  scanIntervalMs: number;
  minConfidenceThreshold: number;
  enabledSources: SignalSource[];
  maxCacheSize: number;
}

export interface PredictionResult {
  id: string;
  predictionId: string;
  timestamp: string;
  content: string; // The primary content
  oracleSet?: OracleSet;
  metadata: Record<string, any>;
}

export interface PredictiveLogEntry {
  timestamp: string;
  event: 'SIGNAL_CAP' | 'PREDICTION_MADE' | 'DRAFT_GEN' | 'CACHE_HIT' | 'PURGE' | 'ARBITER_GATE';
  details: string;
}
