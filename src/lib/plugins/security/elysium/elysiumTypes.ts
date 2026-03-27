export interface IncidentData {
  id: string;
  triggerSource: 'shroud' | 'phoenix' | 'chimera' | 'manual';
  timestamp: number;
  threatLevel: 'low' | 'moderate' | 'high' | 'critical';
  rootCause: string;
  isFalseAlarm: boolean;
}

export interface RestorationStep {
  id: string;
  component: string;
  action: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export interface RecoveryReport {
  id: string;
  incident: IncidentData;
  timeline: { time: number; event: string }[];
  restorationStatus: 'partial' | 'full' | 'failed';
  validationResults: { check: string; status: 'pass' | 'fail' }[];
}

export interface ElysiumAction {
  type: 'analyze-incident' | 'restore-posture' | 'generate-report' | 'validate-system';
  payload: any;
}
