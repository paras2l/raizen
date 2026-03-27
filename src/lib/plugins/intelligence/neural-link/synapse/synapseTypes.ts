export interface IntentPrediction {
  id: string;
  predictedAction: string;
  confidence: number;
  timestamp: number;
  signals: string[];
}

export interface InteractionPattern {
  trigger: string;
  sequence: string[];
  frequency: number;
}

export interface PreloadTarget {
  type: 'FILE' | 'API' | 'UI_COMPONENT';
  path: string;
  priority: number;
}
