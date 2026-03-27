export interface Trend {
  id: string;
  topic: string;
  source: string;
  relevanceScore: number; // 0 to 1
  momentum: 'rising' | 'stable' | 'fading';
  detectedAt: string;
}

export interface TopicOpportunity {
  id: string;
  trendId: string;
  gapDescription: string;
  suggestedAngle: string;
  difficulty: 'low' | 'medium' | 'high';
}

export interface ContentStrategy {
  id: string;
  niche: string;
  goal: string;
  steps: {
    type: 'post' | 'case-study' | 'technical-breakdown';
    topic: string;
    priority: number;
  }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  status: 'draft' | 'published';
}

export interface EngagementMetrics {
  postId: string;
  reach: number;
  interactions: number;
  sentiment: number; // -1 to 1
}
