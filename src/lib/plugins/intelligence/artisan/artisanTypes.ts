export interface ArtisticAsset {
  id: string;
  type: 'image' | 'video' | '3d' | 'concept';
  prompt: string;
  uri: string;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface ArtisanEvolutionState {
  level: number;
  capabilities: string[];
  lastLearningSession: number;
  injectedModules: string[];
}

export interface MediaCreationRequest {
  prompt: string;
  style?: string;
  resolution?: string;
  enhanced?: boolean;
}

export interface ArtisanAction {
  type: 'generate' | 'evolve' | 'research' | 'inject' | 'status';
  payload: any;
}
