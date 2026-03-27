export type MirageTheme = 'Cyberpunk' | 'Zen' | 'Minimalist' | 'Hyper-Focus' | 'Singularity';
export type ProjectionStatus = 'Scanning' | 'Mapping' | 'Projecting' | 'Distorted' | 'Offline';

export interface SurfaceMesh {
  id: string;
  type: 'Wall' | 'Floor' | 'Ceiling' | 'Furniture' | 'Irregular';
  bounds: { x: number; y: number; z: number; width: number; height: number };
  reflectivity: number;
  mappedAt: number;
}

export interface ProjectionOverlay {
  id: string;
  targetSurfaceId: string;
  type: 'Data-Dashboard' | 'Ambient-Visual' | 'UI-Element';
  content: any;
  opacity: number;
  zIndex: number;
}

export interface VisualSkin {
  theme: MirageTheme;
  globalOpacity: number;
  activeOverlays: string[];
}
