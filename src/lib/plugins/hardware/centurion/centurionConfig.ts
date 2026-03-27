export const centurionConfig = {
  scanRangeKm: 50,
  satelliteReachEnabled: true,
  authTimeoutMinutes: 5,
  maxConcurrentCommands: 10,
  safeStates: {
    Vehicle: 'PARKED',
    Yacht: 'ANCHORED',
    Drone: 'LANDED',
    Machinery: 'STOPPED',
  },
};
