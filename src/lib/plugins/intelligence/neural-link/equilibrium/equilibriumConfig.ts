export const EquilibriumConfig = {
  THRESHOLDS: {
    STRESS_HR_SPIKE: 100, // bpm
    HRV_FATIGUE_LIMIT: 40, // ms
    RECOVERY_THRESHOLD: 0.3 // stress score
  },
  UI: {
    TRANSITION_SPEED_MS: 1500,
    PALETTE_CALM: {
      primary: '#A8DADC',
      background: '#F1FAEE',
      accent: '#457B9D'
    }
  },
  WELLBEING: {
    BREATHING_INTERVAL_MS: 300000, // 5 min
    MAX_INTENSIVE_WINDOW_MS: 7200000 // 2 hours
  }
};
