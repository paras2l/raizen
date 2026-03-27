export const FocusConfig = {
  THRESHOLDS: {
    ELEVATED_LOAD: 0.6,
    DEEP_FOCUS_LOAD: 0.85,
    CRITICAL_OVERLOAD: 0.95
  },
  SWITCH_LIMITS: {
    FRAGMENTATION_MIN: 5, // switches per min to trigger alert
    CRITICAL_FRAGMENTATION: 10
  },
  DURATIONS: {
    FRAGMENTATION_WINDOW_MS: 60000, // 1 minute window
    MIN_FOCUS_SESSION_MS: 300000 // 5 minutes
  },
  UI: {
    DIM_PERCENTAGE: 0.4,
    AURA_MODE: 'FOCUS_ULTRA_GOD'
  }
};
