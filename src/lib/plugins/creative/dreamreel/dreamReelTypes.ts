export interface NeuralFrame {
  id: string;
  imageryMetadata: string;
  emotionalintensity: number;
  timestamp: number;
}

export interface DreamScene {
  id: string;
  frames: NeuralFrame[];
  style: 'Hyper-Reality' | 'Surrealism' | 'Sci-Fi';
  audioProfile: string;
  duration: number;
}

export interface CinematicOutput {
  id: string;
  videoUri: string;
  format: string;
  resolution: string;
  status: 'rendering' | 'completed' | 'failed';
}

export interface DreamReelAction {
  type: 'capture' | 'decode' | 'synthesize' | 'orchestrate' | 'status';
  payload: any;
}
