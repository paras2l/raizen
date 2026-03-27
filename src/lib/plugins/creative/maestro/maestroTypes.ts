export interface CreativeDNA {
  id: string;
  creatorName: string;
  signatures: string[];
  patterns: Record<string, any>;
  fidelityScore: number;
}

export interface StylePattern {
  id: string;
  medium: 'art' | 'code' | 'design' | 'music';
  parameters: Record<string, number>;
  signatureElement: string;
}

export interface BrainStateProfile {
  alpha: number; // 8-13 Hz (Focus/Calm)
  beta: number;  // 13-30 Hz (Alert/Active)
  gamma: number; // 30-100 Hz (Peak Intelligence/Flow)
  auraIntensity: number;
}

export type MusicStyle = 'Ambient-Focus' | 'Epic-Triumph' | 'Harmonic-Flow' | 'Pulsing-Alert';

export interface MusicLayer {
  id: string;
  name: string;
  instrument: string;
  volume: number;
  active: boolean;
}

export interface CompositionState {
  currentStyle: MusicStyle;
  tempoBpm: number;
  complexity: number;
  activeLayers: MusicLayer[];
  lastUpdate: number;
}

export interface EmulatedOutput {
  id: string;
  dnaId: string;
  contentUri: string;
  medium: string;
  timestamp: number;
}

export interface MaestroAction {
  type: 'analyze' | 'emulate' | 'generate' | 'composition-sync' | 'trigger-milestone';
  payload: any;
}
