export const serenityConfig = {
  stressThresholds: {
    moderate: 0.40,
    high: 0.75,
    burnout: 0.90
  },

  interventions: {
    autoLightingAdjust: true,
    recommendBreakOnHigh: true,
    aggressiveFilteringOnHigh: true
  },

  monitoringIntervalMs: 60000, // 1 minute
  
  defaultEnvironment: {
    lightingMode: 'ambient' as const,
    soundscapeId: 'white-noise-delta',
    notificationFilterActive: false,
    temperatureTarget: 22.5
  },

  complianceStandards: ['GDPR-Mental-Health', 'Iso-Soverign-Wellbeing']
};
