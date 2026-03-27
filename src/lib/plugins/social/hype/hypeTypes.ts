export interface ViralSignal {
  id: string;
  platform: string;
  type: 'hashtag' | 'format' | 'topic' | 'audio';
  value: string;
  intensity: number; // 0 to 1
}

export interface AlgorithmFactor {
  metric: string;
  weight: number;
  description: string;
}

export interface PostingWindow {
  platform: string;
  bestDay: string;
  bestTime: string;
  strategy: string;
}

export interface EngagementMetrics {
  postId: string;
  views: number;
  likes: number;
  shares: number;
  retentionRate: number;
}

export interface EngagementBooster {
  id: string;
  name: string;
  targetPostId: string;
  targetMetrics: string[];
  multiplier: number;
  swarmSize: number;
  intensity: number;
}

export interface ViralMoment {
  id: string;
  timestamp: number;
  platform: string;
  optimalTime: string;
  predictedReach: number;
  confidence: number;
  reason: string;
  contentIdea: string;
}
