export interface MarketReport {
  industry: string;
  trends: string[];
  averagePricing: Record<string, number>;
  keyPlayers: string[];
  lastUpdated: string;
}

export interface Competitor {
  id: string;
  name: string;
  services: string[];
  estimatedPricing: string;
  strengths: string[];
  weaknesses: string[];
}

export interface PriceBenchmark {
  serviceName: string;
  lowRange: number;
  highRange: number;
  average: number;
  currency: string;
}

export interface NegotiationStrategy {
  id: string;
  title: string;
  approach: 'value-based' | 'tiered-service' | 'scope-adjustment';
  keyArguments: string[];
  fallbackOptions: string[];
}

export interface ProposalDraft {
  id: string;
  targetClient: string;
  scope: string;
  deliverables: string[];
  timeline: string;
  pricing: string;
  status: 'draft' | 'ready';
}
