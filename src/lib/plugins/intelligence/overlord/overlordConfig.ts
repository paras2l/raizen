import { AutonomyLevel } from './overseerTypes';

export const overlordConfig = {
  defaultAutonomyLevel: 'OVERLORD' as AutonomyLevel,
  managementCycleIntervalMs: 300000, // 5 minutes
  simulationDepth: 100,
  optimizationMinThreshold: 0.85,
  criticalAlertPriority: 9,
  highRiskAutoAuthorize: false, // Always notify for high risk
  featurePriorityMatrix: {
    'security.*': 10,
    'intelligence.*': 9,
    'finance.*': 8,
    'infrastructure.*': 7
  }
};
