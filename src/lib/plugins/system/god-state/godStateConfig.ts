import { UnificationLevel } from './godStateTypes';

export const godStateConfig = {
  defaultLevel: 'OMNISCIENCE' as UnificationLevel,
  syncIntervalMs: 30000,
  neuralSensitivityThreshold: 0.92,
  omniscienceTelemetryRefreshMs: 5000,
  maxAllowedLagMs: 10,
  unificationPriorities: ['Neural-Link', 'Digital-Sovereignty', 'Physical-Domain'],
  linkNodes: ['Apex-Core', 'Nexus-Mesh', 'Hyperion-Grid', 'Tesla-Layer']
};
