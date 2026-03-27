export const CitadelConfig = {
  RISK_WEIGHTS: {
    CRIME: 1.0,
    PROTEST: 1.0,
    TRAFFIC: 0.5,
    CONSTRUCTION: 0.4,
    WEATHER: 0.2
  },
  REROUTE_SENSITIVITY: 0.95, // Urgent/Immediate
  SATELLITE_REFRESH_INTERVAL: 100, // 0.1 seconds (Real-time)
  MOCK_DATA_ENABLED: false, // Live Data Stream Only
  CITADEL_VERSION: '8.8.8-GOD-LAYER'
};
