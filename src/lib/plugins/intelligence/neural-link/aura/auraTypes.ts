export type InteractionMode = 'DEEP_WORK' | 'EXPLORATION' | 'LEARNING' | 'REST';
export type VoiceTone = 'TECHNICAL' | 'CASUAL' | 'SUPPORTIVE';

export interface IdentityState {
  mode: InteractionMode;
  tone: VoiceTone;
  visualDensity: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: number;
}

export interface AuraSignal {
  type: 'SPEED' | 'INTENSITY' | 'ACTIVITY';
  value: number;
  weight: number;
}

export interface UIProfile {
  palette: string;
  animationEasing: string;
  density: number;
}
