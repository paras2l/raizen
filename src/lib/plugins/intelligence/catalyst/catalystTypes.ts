export type ResearchField = 'Nanotechnology' | 'Robotics' | 'Advanced-Materials' | 'Quantum-Computing' | 'Bio-Engineering';

export interface ResearchPaper {
  id: string;
  title: string;
  field: ResearchField;
  summary: string;
  relevanceScore: number;
  publishedAt: number;
}

export interface SimulationResult {
  id: string;
  field: ResearchField;
  outcome: 'Stable' | 'Unstable' | 'Breakthrough';
  data: any;
  timestamp: number;
}

export interface PrototypeSpec {
  id: string;
  name: string;
  field: ResearchField;
  cadModelData: string; // Base64 or JSON CAD representation
  requirements: string[];
}

export interface CatalystAction {
  type: 'run-sim' | 'analyze-research' | 'design-prototype' | 'brainstorm';
  payload: any;
}
