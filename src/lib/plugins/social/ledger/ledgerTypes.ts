export interface InteractionEvent {
  id: string;
  contactId: string;
  type: 'collaboration' | 'referral' | 'introduction' | 'advice' | 'favor';
  description: string;
  timestamp: string;
}

export interface ValueExchange {
  contactId: string;
  valueGiven: string[];
  valueReceived: string[];
  netBalance: number; // Positive = they owe you, Negative = you owe them
}

export interface RelationshipStatus {
  contactId: string;
  state: 'balanced' | 'surplus' | 'deficit';
  lastInteraction: string;
  strengthScore: number; // 0 to 1
}

export interface StrategicReminder {
  id: string;
  contactId: string;
  reason: string;
  suggestedAction: string;
  priority: 'low' | 'medium' | 'high';
}
