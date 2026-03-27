export type CrisisSeverity = 'Low' | 'Moderate' | 'High' | 'Catastrophic';

export interface CrisisEvent {
  id: string;
  type: 'Market-Crash' | 'Currency-Collapse' | 'Geopolitical-Shock';
  probability: number; // 0-1
  estimatedImpact: number; // 0-1
  leadTimeHours: number;
  severity: CrisisSeverity;
}

export interface SafeHavenAllocation {
  id: string;
  assetType: 'Gold' | 'Crypto' | 'Land' | 'Offshore';
  amount: number;
  destination: string;
  status: 'pending' | 'allocated' | 'shielded';
}

export interface RiskIndicator {
  label: string;
  value: number;
  trend: 'stable' | 'rising' | 'falling';
}

export interface AegisAction {
  type: 'predict-crisis' | 'allocate-haven' | 'dispatch-alert' | 'audit-event';
  payload: any;
}
