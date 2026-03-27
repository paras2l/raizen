export interface LearningTopic {
  id: string;
  name: string;
  category: 'Language' | 'Coding' | 'Medical' | 'Research' | 'General';
  content: string;
  priority: number;
}

export interface ReinforcementSession {
  topicId: string;
  type: 'PRE_SLEEP' | 'POST_SLEEP';
  scheduledTime: number;
  data: string[]; // Condensed items
}

export interface SleepPhase {
  detectedAt: number;
  expectedWakeAt: number;
  certainty: number;
}

export interface RetentionLog {
  topicId: string;
  score: number;
  lastReview: number;
}
