export type AudioZoneMode = 'CONFIDENCE' | 'CALM_SHIELD' | 'NEGOTIATION_EDGE' | 'DEEP_FOCUS' | 'AMPLIFIED';

export interface AcousticSignal {
  id: string;
  frequency: number; // Hz
  gain: number; // dB
  duration: number; // ms
  type: 'BINAURAL' | 'MONAURAL' | 'SUBWAV' | 'ULTRASONIC';
}

export interface AudioZone {
  id: string;
  name: string;
  mode: AudioZoneMode;
  coordinates: { x: number; y: number; z: number };
  radius: number; // meters
  activeSignals: AcousticSignal[];
}

export interface SpatialState {
  activeZones: AudioZone[];
  noiseFloor: number; // dB
  interferenceLevel: number;
}
