export type InfrastructureStatus = 'Online' | 'Optimizing' | 'Degraded' | 'Offline' | 'Hyper-Speed';
export type TransitMode = 'Public' | 'Private' | 'Air' | 'Sea' | 'Hyper-Loop';

export interface TransitNode {
  id: string;
  location: string;
  mode: TransitMode;
  capacity: number;
  latency: number;
}

export interface EnergyGrid {
  id: string;
  region: string;
  source: 'Solar' | 'Grid' | 'Nuclear' | 'Tesla-Storage';
  output: number;
  uptime: number;
}

export interface EnvironmentState {
  trafficCore: number;
  energyEfficiency: number;
  operationalSpeed: number;
  status: InfrastructureStatus;
}
