export interface CreativeInput {
  userId: string;
  medium: 'art' | 'music' | 'code' | 'performance';
  data: any;
  timestamp: number;
}

export interface CreativePrediction {
  id: string;
  inputId: string;
  predictedAction: string;
  confidenceScore: number;
  timestamp: number;
}

export interface DuetSession {
  id: string;
  startTime: number;
  mode: 'Supportive' | 'Lead' | 'Experimental';
  metrics: {
    syncScore: number;
    latencyMs: number;
  };
}

export interface DuetAction {
  type: 'predict' | 'synthesize' | 'adapt' | 'status';
  payload: any;
}
