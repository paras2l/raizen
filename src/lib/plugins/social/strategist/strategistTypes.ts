export interface SignalStream {
  id: string;
  source: 'Satellite' | 'Radio' | 'RF' | 'Other';
  frequency: string;
  coordinates: { lat: number; lng: number };
  timestamp: number;
}

export interface InterceptResult {
  id: string;
  streamId: string;
  data: any;
  decryptionStatus: 'success' | 'pending' | 'failed';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface StrategicInsight {
  id: string;
  summary: string;
  recommendation: string;
  confidence: number;
}

export interface StrategistAction {
  type: 'intercept' | 'analyze' | 'assess' | 'status';
  payload: any;
}
