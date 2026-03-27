export const mintConfig = {
  defaultJurisdiction: 'Global-Sovereign',
  privacyTiers: 5,
  autoOptimizeTax: true,
  complianceWatchlist: ['FATF', 'OECD', 'Global-Sovereign-Council'],
  
  jurisdictionBenchmarking: {
    'Cayman': { tax: 0.0, privacy: 0.95 },
    'Singapore': { tax: 0.17, privacy: 0.85 },
    'Switzerland': { tax: 0.12, privacy: 0.90 },
    'Nevada': { tax: 0.0, privacy: 0.80 },
    'Global-Sovereign': { tax: 0.0, privacy: 0.99 }
  } as Record<string, any>,

  automatedTransferLimit: 1000000, // USD equivalent
  
  auditFrequencyMs: 3600000 // Hourly
};
