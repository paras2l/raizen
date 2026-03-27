export interface NetworkingGoal {
  id: string;
  description: string;
  targetIndustry: string;
  deadline: string;
  priority: number;
}

export interface ConnectionNode {
  id: string;
  name: string;
  degree: number; 
  relevance: number; // 0 to 1
  industry: string;
}

export interface InfluenceScore {
  nodeId: string;
  score: number;
  factors: string[];
}

export interface IntroductionStrategy {
  targetNodeId: string;
  path: string[];
  suggestedAction: 'mutual_intro' | 'event_meeting' | 'personalized_outreach';
  urgency: 'low' | 'medium' | 'high';
}
