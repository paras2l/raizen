export interface MarketSignal {
  id: string;
  source: string;
  type: 'economic' | 'technological' | 'regulatory' | 'sentiment';
  indicator: string;
  intensity: number; // 0 to 1
}

export interface SentimentData {
  industry: string;
  sentimentScore: number; // -1 to 1
  trendingTopics: string[];
}

export interface SupplyChainEvent {
  material: string;
  event: string;
  impactLevel: 'low' | 'medium' | 'high';
  region: string;
}

export interface IntelligenceReport {
  timestamp: string;
  overallTrend: string;
  criticalSignals: MarketSignal[];
  strategicRecommendation: string;
}
