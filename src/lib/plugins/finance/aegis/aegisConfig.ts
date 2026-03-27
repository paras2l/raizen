export const aegisConfig = {
  predictionHorizonHours: 48,
  crashProbabilityThreshold: 0.75,
  impactThreshold: 0.60,
  
  safeHavens: [
    { type: 'Gold', allocation: 0.4 },
    { type: 'Crypto', allocation: 0.3 },
    { type: 'Land', allocation: 0.2 },
    { type: 'Offshore', allocation: 0.1 }
  ],

  monitoringFrequencies: {
    news: 60000, // 1 min
    trading: 1000, // 1 sec
    satellite: 300000 // 5 min
  },

  alertPriority: 'CRITICAL',
  autoRelocate: true
};
