export const cabalConfig = {
  scanDepth: 3, // Degrees of separation
  minInfluenceThreshold: 65,
  refreshRateDays: 7,
  weightFactors: {
    financialControl: 0.4,
    politicalLeverage: 0.3,
    socialCapital: 0.2,
    historicalOutcomes: 0.1,
  },
};
