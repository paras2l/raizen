export const lexConfig = {
  jurisdictionBenchmarks: ['US-DE', 'UK-London', 'SG-Singapore', 'CH-Zug', 'KY-Cayman'],
  riskThresholds: {
    critical: 0.90,
    high: 0.70,
    medium: 0.40
  },

  scanningFrequencies: {
    loopholeCheck: 100, // per sec
    disputeSimulation: 10 // per sec
  },

  defaultJurisdiction: 'US-DE',
  autoRedline: true
};
