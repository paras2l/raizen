export type ErasureStage = 'Triggered' | 'NetworkPurge' | 'LocalWipe' | 'LogNullification' | 'Finalized';
export type PurgePriority = 'High' | 'Medium' | 'Low';

export interface ErasureEvent {
  id: string;
  stage: ErasureStage;
  timestamp: number;
  details: string;
}

export interface DestructionVector {
  target: 'Cloud' | 'Local' | 'Mobile' | 'Mesh';
  status: 'Pending' | 'Active' | 'Completed' | 'Failed';
}

export interface PhoenixAction {
  type: 'initiate' | 'purge-network' | 'wipe-hardware' | 'nullify-logs';
  payload: any;
}
