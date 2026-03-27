import { RiskLevel } from './aegisTypes';

export const aegisConfig = {
  autoRelocateThreshold: 'High' as RiskLevel,
  preferredSafeZones: ['Singapore', 'Switzerland', 'New Zealand', 'Iceland'],
  monitoringIntervalMinutes: 15,
  maxAssetMovementParallel: 5,
};
