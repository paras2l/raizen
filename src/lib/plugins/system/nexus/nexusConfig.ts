export const nexusConfig = {
  syncIntervalMs: 100, // High-frequency delta sync
  encryptionStandard: 'AES-GCM-512',
  maxNodes: 1024,
  nodePriorities: {
    'pc': 100,
    'cloud': 80,
    'mobile': 50,
  },
};
