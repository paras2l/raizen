export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Extreme';

export interface PhysicalAsset {
  id: string;
  name: string;
  type: 'Drone' | 'Server' | 'Hardware' | 'Satellite';
  location: string; // Region or coordinates
  status: 'Operational' | 'Relocating' | 'Compromised';
  health: number; // 0-100
}

export interface RelocationPlan {
  assetId: string;
  from: string;
  to: string;
  estimatedArrival: number;
  priority: number;
}

export interface GeopoliticalRisk {
  region: string;
  riskType: 'Conflict' | 'Unrest' | 'Hazard';
  level: RiskLevel;
  description: string;
}

export interface AegisShieldAction {
  type: 'forecast' | 'track' | 'relocate' | 'advise';
  payload: any;
}
