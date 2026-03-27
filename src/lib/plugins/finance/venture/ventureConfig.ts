export const ventureConfig = {
  loadThresholds: {
    cpu: 0.85,
    gpu: 0.90,
    ram: 0.80
  },
  maxRemoteNodes: 100,
  ephemeralLinkDurationMs: 300000, // 5 minutes
  encryptionTier: 'Quantum-XS',
  stealthMode: true,
  
  globalRegions: ['NA-EAST', 'EU-WEST', 'AS-NORTH', 'SA-CENTRAL'],
  
  allocationPriorities: ['Latency', 'Stealth', 'Capacity'],
  
  resultMergeSyncIntervalMs: 500
};
