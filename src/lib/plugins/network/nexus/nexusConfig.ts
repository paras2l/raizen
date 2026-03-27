export const nexusConfig = {
  syncIntervalMs: 60000,
  minConsensusNodes: 3,
  trustThreshold: 0.95,
  shunThreshold: 0.6,
  maxPeers: 50,
  regions: ['North-America', 'Europe', 'Asia-Pacific', 'Middle-East', 'Deep-Space'],
  seedNodes: [
    { id: 'SN-EURO-01', region: 'Europe', status: 'Active' },
    { id: 'SN-APAC-01', region: 'Asia-Pacific', status: 'Active' }
  ]
};
