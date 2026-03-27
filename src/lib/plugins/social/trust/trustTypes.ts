export interface FactualClaim {
  id: string;
  statement: string;
  category: 'statistic' | 'event' | 'quote' | 'scientific';
  confidence: number;
}

export interface SourceProfile {
  id: string;
  name: string;
  type: 'news' | 'social_media' | 'blog' | 'official_gov' | 'academic';
  reliabilityScore: number; // 0 to 1
  biasDirection: 'left' | 'right' | 'neutral' | 'unknown';
}

export interface CredibilityReport {
  score: number;
  level: 'low' | 'moderate' | 'high';
  misinformationIndicators: string[];
  summary: string;
}

export interface MisinformationPattern {
  name: string;
  severity: number;
  description: string;
}
