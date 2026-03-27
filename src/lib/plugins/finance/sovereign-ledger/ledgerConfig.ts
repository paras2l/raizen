export const ledgerConfig = {
  maxEffectiveTaxRate: 0.15, // 15% cap for Top 1% strategies
  monitoringIntervalMs: 3600000, // 1 hour
  jurisdictionsToTrack: 195,
  
  preferredJurisdictions: ['Cayman-Islands', 'Singapore', 'Switzerland', 'Luxembourg', 'Dubai'],
  
  optimizationLevels: {
    standard: 0.05,
    aggressive: 0.20,
    sovereign: 0.50
  },

  complianceStandards: ['OECD-BEPS', 'FATCA', 'CRS', 'GDPR-Sovereign']
};
