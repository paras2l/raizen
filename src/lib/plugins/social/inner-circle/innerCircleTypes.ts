export interface InfluencerTarget {
  id: string;
  name: string;
  niche: string;
  influenceScore: number;
  tags: string[];
}

export interface NetworkMap {
  targetId: string;
  connections: string[];
  communities: string[];
}

export interface CommunicationProfile {
  targetId: string;
  tone: string;
  preferredTopics: string[];
  engagementTriggers: string[];
}

export interface InfiltrationStrategy {
  targetId: string;
  goldenOutreach: string;
  channel: string;
  followUpCadence: string;
}
