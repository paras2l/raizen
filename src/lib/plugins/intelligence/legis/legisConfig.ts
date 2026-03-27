import { Jurisdiction } from './legisTypes';

export const legisConfig = {
  forecastHorizonMonths: 6,
  minConfidenceAlertThreshold: 0.70,
  activeJurisdictions: ['US', 'EU', 'CN', 'GLOBAL'] as Jurisdiction[],
  refreshIntervalMs: 86400000, // 24 hours
  dataSources: ['UN Archives', 'Congressional Records', 'EU Lex', 'Global Gazettes'],
};
