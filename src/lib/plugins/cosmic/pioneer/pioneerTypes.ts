export interface CosmicSignal {
  id: string;
  source: 'Satellite' | 'Probe' | 'Interstellar' | 'Unknown';
  frequency: string;
  sourceLocation: string; // e.g., 'Mars Orbit', 'Alpha Centauri'
  timestamp: number;
}

export interface CosmicEvent {
  id: string;
  type: 'Solar Flare' | 'Asteroid' | 'Discovery' | 'Hazard';
  magnitude: number;
  probability: number;
  description: string;
}

export interface PioneerAlert {
  id: string;
  eventId: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  message: string;
}

export interface PioneerAction {
  type: 'scan' | 'analyze' | 'predict' | 'status';
  payload: any;
}
