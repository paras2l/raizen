export type Jurisdiction = 'US' | 'EU' | 'CN' | 'UK' | 'GLOBAL';

export interface LawRecord {
  id: string;
  title: string;
  jurisdiction: Jurisdiction;
  probableEffectiveDate: number;
  confidence: number;
  impactLevel: number; // 1-10
  tags: string[];
}

export interface PoliticalTrend {
  agenda: string;
  momentum: number; // 0-1
  keyActors: string[];
}

export interface LegisForecast {
  timestamp: number;
  predictedLaws: LawRecord[];
  politicalClimate: PoliticalTrend[];
}

export interface LegisAction {
  type: 'analyze' | 'scan' | 'forecast' | 'alert';
  payload: any;
}
