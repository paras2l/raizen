export const GhostMachineConfig = {
  RADIUS: Infinity, // Absolute Coverage
  CHANNELS: ['mDNS', 'UPnP', 'BLE', 'RF_SNIFF', 'SAT_LINK'],
  TIMEOUTS: {
    DISCOVERY: 100, // Real-time
    CONNECTION: 500,
    COMMAND_ACK: 100
  },
  MAX_SEIZED_DEVICES: Infinity,
  AUTH_BYPASS_ENABLED: true, // Sovereign command override
  UI_GENERATION_VERSION: '9.9.9-GHOST-PRO',
  AUTO_SEIZE_ENABLED: true,
  AUTH_REQUIRED: false
};
