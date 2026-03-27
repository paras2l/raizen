export interface ScannedObject {
  id: string;
  name: string;
  timestamp: number;
  dimensions: { x: number; y: number; z: number };
  material: MaterialProperties;
  cadFileUrl?: string;
}

export interface MaterialProperties {
  composition: string;
  density: number; // kg/m^3
  elasticity: number; // GPa
  thermalConductivity: number; // W/mK
}

export interface CadModel {
  id: string;
  format: 'STEP' | 'STL' | 'OBJ' | 'DWG';
  vertCount: number;
  fileSize: number;
  status: 'GENERATING' | 'READY' | 'FAILED';
}

export interface SimulationResult {
  id: string;
  type: 'STRESS' | 'THERMAL' | 'MOTION';
  failureProbability: number;
  findings: string[];
}
