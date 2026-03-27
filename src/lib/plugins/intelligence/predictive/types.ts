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

export interface AnticipatedNeed {
  id: string;
  type: PredictionType;
  title: string;
  confidence: number;
  signals: string[]; // IDs of source signals
  reasons: string[];
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
  content: string; // The draft, research, or summary
  metadata: Record<string, any>;
}

export interface PredictiveLogEntry {
  timestamp: string;
  event: 'SIGNAL_CAP' | 'PREDICTION_MADE' | 'DRAFT_GEN' | 'CACHE_HIT' | 'PURGE';
  details: string;
}
