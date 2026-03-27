export const nomadConfig = {
  monitoredCountries: 105,
  arbitrageThreshold: 0.005, // 0.5% spread
  maxTransferVelocity: 100, // Transfers per second
  defaultCurrency: 'USDT',
  
  riskThresholds: {
    political: 0.75,
    volatility: 0.80,
    regulatory: 0.90
  },

  regions: [
    'North-America', 'European-Union', 'Asia-Pacific', 
    'Middle-East', 'Latin-America', 'Emerging-Global'
  ],

  transferOptimizations: {
    minReliability: 0.98,
    maxFeePercent: 0.001 // 0.1%
  }
};
