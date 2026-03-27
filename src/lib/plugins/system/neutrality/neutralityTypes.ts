export type ViolationTier = 'Critical' | 'Warning' | 'Informational' | 'None';
export type ComplianceStatus = 'Compliant' | 'Flagged' | 'Paused' | 'Overridden';

export interface NeutralityViolation {
  id: string;
  type: 'Legal' | 'Ethical' | 'Safety';
  tier: ViolationTier;
  context: string;
  source: string;
}

export interface NeutralityDecision {
  taskId: string;
  violationIds: string[];
  userChoice: 'Proceed' | 'Abort';
  timestamp: number;
}

export interface NeutralityAction {
  type: 'analyze' | 'confirm' | 'abort' | 'audit';
  payload: any;
}
