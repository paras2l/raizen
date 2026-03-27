export const godCodeConfig = {
  pulseTimeoutMs: 30000, // 30 second window
  codewordGracePeriodMs: 60000,
  maxAttempts: 3,
  bypassNeuralSafety: false, // Always require biometric if available
  highRiskActions: [
    'system.phoenix-omega.ignite',
    'system.untis.governance-execute',
    'security.void.shun-all'
  ]
};
