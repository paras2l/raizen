export interface LegalFramework {
  id: string;
  region: string;
  name: string;
  protections: string[];
  lastUpdated: string;
}

export interface PrivacyScore {
  platform: string;
  score: number; // 0 to 100
  concerns: string[];
}

export interface JurisdictionRisk {
  region: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  factors: string[];
}

export interface HostingAdvice {
  suggestedRegion: string;
  rationale: string;
  alternativeRegion: string;
}
