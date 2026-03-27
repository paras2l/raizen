export interface TargetProfile {
  id: string;
  name: string;
  role: string;
  interests: string[];
  recentPublicActivities: string[];
  influenceLevel: 'high' | 'ultra' | 'legendary';
}

export interface CommunicationStyle {
  tone: 'formal' | 'technical' | 'laconic' | 'warm';
  preferredJargon: string[];
  averageMessageLength: 'short' | 'medium' | 'long';
}

export interface OutreachOpportunity {
  id: string;
  targetId: string;
  triggerEvent: string;
  recommendedWindowStart: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface DraftMessage {
  id: string;
  targetId: string;
  content: string;
  psychologicalTriggers: string[];
  platform: 'email' | 'linkedin' | 'twitter' | 'direct';
}
