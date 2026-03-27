export const anchorConfig = {
  hardwareEnforced: true,
  riskThreshold: 'High', // Commands at or above this risk level require hardware auth
  sessionDurationMs: 300000, // 5 minutes
  emergencyCodeword: 'PHOENIX-RISING-ZERO', // Internal emergency bypass
  maxAuthAttempts: 3,
};
