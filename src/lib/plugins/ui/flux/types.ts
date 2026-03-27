export type UIContext = 'CODING' | 'WRITING' | 'ANALYSIS' | 'COMMUNICATION' | 'MEDIA' | 'IDLE';

export interface LayoutTemplate {
  id: string;
  name: string;
  panels: string[];
  activeTools: string[];
}

export interface MorphState {
  currentContext: UIContext;
  currentLayout: string;
  isTransitioning: boolean;
  locked: boolean;
}

export interface FluxConfig {
  detectionIntervalMs: number;
  enableAnimations: boolean;
  autoMorph: boolean;
}
