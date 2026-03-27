export interface SocialNode {
  id: string;
  name: string;
  type: 'individual' | 'organization' | 'dao';
  valueScore: number; // 0 to 1
  lastInteraction: string;
  platform: string;
}

export interface InteractionRecord {
  id: string;
  nodeId: string;
  timestamp: string;
  platform: string;
  sentiment: number; // -1 to 1
  context: string;
}

export interface ReconnectionReminder {
  id: string;
  nodeId: string;
  priority: 'low' | 'medium' | 'high';
  suggestedHook: string;
  reason: string;
}

export interface SocialGraphData {
  nodes: SocialNode[];
  links: { source: string; target: string; strength: number }[];
}
