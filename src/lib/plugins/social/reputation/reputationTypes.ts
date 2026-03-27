export interface OnlineMention {
  id: string;
  source: string;
  url: string;
  content: string;
  timestamp: string;
  reach: number; // 0 to 1
}

export interface SentimentProfile {
  score: number; // -1 to 1
  label: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export interface AlertConfig {
  minReachForAlert: number;
  alertOnNegativeOnly: boolean;
}

export interface ReputationResponse {
  mentionId: string;
  draft: string;
  suggestedPlatform: string;
}
