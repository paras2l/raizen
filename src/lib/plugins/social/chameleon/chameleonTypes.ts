export interface CommunityProfile {
  id: string;
  name: string;
  archetype: 'professional' | 'casual' | 'technical' | 'meme-heavy';
  topJargon: string[];
  formalityLevel: number; // 0 to 1
  humorStyle: string;
}

export interface CulturalPattern {
  sarcasmFrequency: number;
  emojiDensity: number;
  avgSentenceLength: number;
  formalityMarkers: string[];
}

export interface JargonEntry {
  term: string;
  definition: string;
  context: string;
  usageFrequency: number;
}

export interface PersonaDelta {
  toneAdjustment: string;
  jargonInjection: string[];
  styleShift: string;
}

export interface InteractionSuggestion {
  type: 'comment' | 'post' | 'connection';
  content: string;
  reason: string;
  relevanceScore: number;
}
