export const SovereignConfig = {
  THRESHOLDS: {
    ACCEL_MAX: 9.8, // m/s^2 (G-Force alert)
    VELOCITY_URGENT: 120, // Relative velocity unit
    LOCATION_RADIUS_SAFE: 5000 // meters
  },
  ALERTS: {
    AUDIO_ENABLED: true,
    VISUAL_INTENSITY: 0.9
  },
  RETENTION_LIMIT: 100
};
