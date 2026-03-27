export interface RealityOverlay {
  id: string;
  type: 'vfx' | 'fantasy' | 'photorealistic' | 'cinematic';
  elements: VisualElement[];
  opacity: number;
  blendMode: string;
  timestamp: number;
}

export interface VisualElement {
  id: string;
  assetUri: string;
  position: { x: number; y: number; z: number };
  scale: number;
  rotation: number;
}

export interface CaptureState {
  sourceId: string;
  resolution: string;
  bitrate: number;
  isActive: boolean;
}

export interface IllusionistAction {
  type: 'capture' | 'overlay' | 'synthesize' | 'integrate' | 'status';
  payload: any;
}
