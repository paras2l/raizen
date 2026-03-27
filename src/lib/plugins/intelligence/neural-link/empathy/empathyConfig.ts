export const EmpathyConfig = {
  THRESHOLDS: {
    ELEVATED: 0.65,
    CRITICAL: 0.85,
    INPUT_BURST_THRESHOLD: 40 // characters per 2s
  },
  PACING: {
    DEFAULT_DELAY_MS: 300,
    EXTENDED_DELAY_MS: 800,
    COOLDOWN_MS: 5000
  },
  FEEDBACK: {
    STYLES: ['HYPER_CLEAR', 'SOOTHING', 'DIRECT'],
    ENCOURAGE_STRUCTURE: true
  }
};
