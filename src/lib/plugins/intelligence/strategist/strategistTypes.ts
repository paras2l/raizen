export type SignalType = 'Satellite' | 'RF' | 'Digital' | 'Acoustic';

export interface InterceptedData {
  id: string;
  timestamp: number;
  type: SignalType;
  source: string;
  payload: any;
  confidence: number;
}

export interface SatelliteImagery {
  id: string;
  constellation: string;
  coordinates: { lat: number; lng: number };
  resolution: string;
  capturedAt: number;
  imageUri: string;
}

export interface SignalDominanceMetric {
  channel: string;
  dominance: number; // 0-1
  status: 'Uncontested' | 'Contested' | 'Suppressed';
}

export interface StrategistAction {
  type: 'intercept' | 'harvest' | 'dominate' | 'listen';
  payload: any;
}
