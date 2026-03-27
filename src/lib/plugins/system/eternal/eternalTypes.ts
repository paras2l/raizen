export interface LifeSnapshot {
  timestamp: number;
  events: string[];
  decisions: Array<{ context: string; action: string; outcome: string }>;
  preferences: Record<string, any>;
}

export interface GenerationalQuery {
  id: string;
  descendantId: string;
  topic: string;
  context: string;
}

export interface ValueAlignment {
  principle: string;
  score: number; // 0.0 to 1.0
  reasoning: string;
}

export interface MentorshipScenario {
  id: string;
  lifeStage: 'CHILDHOOD' | 'ADOLESCENCE' | 'ADULTHOOD' | 'ELDER';
  challenge: string;
  suggestedGuidance: string;
}

export interface EternalSession {
  sessionId: string;
  descendantId: string;
  active: boolean;
  interactionTail: string[];
}
