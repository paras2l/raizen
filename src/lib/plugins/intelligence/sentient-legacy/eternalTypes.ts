export interface AdaptiveAdvice {
  adviceId: string;
  originalContext: string;
  currentAdvice: string;
  lastUpdated: number;
  adaptationSource: string; // e.g. 'GLOBAL_EVENT_X'
}

export interface LegacyEvent {
  eventId: string;
  type: 'HEALTH' | 'TECH' | 'SOCIETY' | 'PERSONAL';
  description: string;
  relevanceScore: number;
  ingestedAt: number;
}

export interface SuccessorContext {
  successorId: string;
  accessTier: 'FULL' | 'ADVISORY' | 'RESTRICTED';
  relationship: string;
  lastAccess: number;
}

export interface EternalSession {
  sessionId: string;
  activeMentor: string; // The specific archetype being used
  updatesApplied: number;
}
