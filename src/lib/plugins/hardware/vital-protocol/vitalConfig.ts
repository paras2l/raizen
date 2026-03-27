export const VitalConfig = {
  THRESHOLDS: {
    PULSE: { MIN: 40, MAX: 180 }, // Wide Dynamic Range
    BREATH: { MIN: 8, MAX: 35 },
    TEMPERATURE: { MIN: 35.0, MAX: 40.0 },
    HRV_LOW_ALARM: 15 // ms
  },
  SENSIVITY: {
    THERMAL: 0.001, // Atomic-level thermal precision
    OPTICAL_MICROMOVE: 0.001 // Atomic-level movement tracking
  },
  SCAN_INTERVAL: 1000, // 1 second (Continuous)
  PRE_EMPTIVE_DIAGNOSIS_ENABLED: true,
  VITAL_VERSION: '7.7.7-OVERWATCH-PRO'
};
