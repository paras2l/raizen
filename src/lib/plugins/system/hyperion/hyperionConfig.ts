import { InfrastructureStatus } from './hyperionTypes';

export const hyperionConfig = {
  defaultStatus: 'Hyper-Speed' as InfrastructureStatus,
  syncIntervalMs: 60000,
  speedOptimizationThreshold: 0.95,
  energySafetyMargin: 0.15,
  transitRefreshRate: 5000,
  maxOperationalLatencyMs: 50,
  priorityRegions: ['Switzerland', 'Japan', 'Singapore', 'Iceland'],
  sourcePriority: ['Tesla-Storage', 'Solar', 'Nuclear', 'Grid']
};
