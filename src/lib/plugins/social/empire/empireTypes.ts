export interface Venture {
  id: string;
  name: string;
  niche: string;
  status: 'researching' | 'branding' | 'launching' | 'active';
  revenuePotential: string;
}

export interface MarketGap {
  niche: string;
  demandScore: number; // 0 to 1
  competitionLevel: 'low' | 'medium' | 'high';
  keywords: string[];
}

export interface BrandIdentity {
  ventureId: string;
  tagline: string;
  values: string[];
  visualDirection: string;
}

export interface LaunchSequence {
  steps: string[];
  timelineDays: number;
}
