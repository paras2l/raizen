export type AutonomyLevel = 'Passive' | 'Cooperative' | 'Operational' | 'Full-Autonomy' | 'OVERLORD';
export type OptimizationRisk = 'LOW' | 'MODERATE' | 'HIGH' | 'SYSTEMIC';

export interface EmpireState {
  featureCount: number;
  activePlugins: string[];
  systemHealth: number;
  lastManagementCycle: number;
  autonomyLevel: AutonomyLevel;
}

export interface OptimizationAction {
  id: string;
  targetFeatureId: string;
  action: string;
  risk: OptimizationRisk;
  benefitScore: number;
  executedAt?: number;
}

export interface AutonomyReport {
  timestamp: number;
  decisionsMade: number;
  resourceOptimized: string;
  criticalAlerts: string[];
}
