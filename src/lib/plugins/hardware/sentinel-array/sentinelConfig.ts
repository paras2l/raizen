export const SentinelConfig = {
  THRESHOLDS: {
    BREACH_CONFIDENCE: 0.5, // Ultra-sensitive detection
    DETERRENT_STRENGTH: 1.0, // Maximum deterrent
    LOCKDOWN_RADIUS: Infinity // Global Premises Lockdown
  },
  STROBE_FREQUENCY: 24, // Hz - Extreme disorientation
  AUDIO_SIM_SCRIPTS: ['SECURITY_TEAM_RESPONSE', 'DOG_BARK_SYNTH', 'AUTH_WARNING', 'OVERWHELMING_FORCE'],
  LOCKDOWN_TIMEOUT: Infinity, // Manual Release Only
  SENTINEL_VERSION: '9.9.9-UNSTOPPABLE'
};
