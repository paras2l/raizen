export const voidConfig = {
  rotationIntervalMs: 1, // Millisecond rotation
  nodeCount: 1000,
  parityThreshold: 670, // 2/3 and 1 for BFT
  shardingAlgorithm: 'Shamir-Threshold-Secret-Sharing',
  defaultStandard: 'Quantum-Safe-AES-Q1' as any,
  tamperResponse: 'Instant-Node-Shunning',
  globalMeshSync: true
};
