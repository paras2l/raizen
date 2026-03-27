import { GridStatus } from './teslaTypes';

export const teslaConfig = {
  defaultStatus: 'Independent' as GridStatus,
  syncIntervalMs: 60000,
  solarEfficiencyTarget: 0.98,
  batterySafetyMargin: 0.20,
  profitSellThreshold: 0.15, // Sell if market price is 15% above average
  maxChargeRate: 50000, // Watts
  batteryBanks: ['Main-Alpha', 'Reserve-Beta', 'Emergency-Gamma'],
  sourcePriority: ['Solar', 'Wind', 'Battery-Pack']
};
