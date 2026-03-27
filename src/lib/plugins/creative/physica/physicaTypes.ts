export interface DesignObjective {
  id: string;
  name: string;
  productType: 'car' | 'house' | 'machinery' | 'other';
  constraints: string[];
  materials: string[];
  timestamp: number;
}

export interface SimulationResult {
  id: string;
  objectiveId: string;
  status: 'passed' | 'failed';
  stressAnalysis: number;
  aerodynamicsScore: number;
  weightDistribution: Record<string, number>;
}

export interface CADModel {
  id: string;
  objectiveId: string;
  modelUri: string;
  fileFormat: 'STEP' | 'IGES' | 'STL';
  components: number;
  assemblyInstructions: string;
}

export interface PhysicaAction {
  type: 'interpret' | 'simulate' | 'generate' | 'check' | 'status';
  payload: any;
}
