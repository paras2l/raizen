export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SystemStateModel {
  fileCount: number;
  totalSizeBytes: number;
  treeSnapshot: any;
}

export interface PredictedChange {
  action: string;
  target: string;
  outcome: 'SUCCESS' | 'CONFLICT' | 'WARNING';
}

export interface SimulationSession {
  id: string;
  startTime: string;
  originalMission: string;
  predictedState: SystemStateModel;
  changes: PredictedChange[];
  status: ApprovalStatus;
}

export interface ChronosConfig {
  maxSimulatedFiles: number;
  enableVisualDiff: boolean;
  autoSimulateRiskThreshold: number; // 0.0 to 1.0
}
