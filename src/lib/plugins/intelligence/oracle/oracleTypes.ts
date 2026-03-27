export type GlobalMood = 'Panic' | 'Optimism' | 'Unrest' | 'Stability' | 'Uncertainty';

export interface StrategicInsight {
  id: string;
  trend: string;
  sentiment: GlobalMood;
  confidence: number;
  recommendation: string;
  timestamp: number;
}

export interface TrendData {
  topic: string;
  growthRate: number;
  regionalIntensity: Record<string, number>;
  sources: string[];
}

export interface OracleAction {
  type: 'ingest' | 'analyze' | 'predict' | 'brief';
  payload: any;
}
