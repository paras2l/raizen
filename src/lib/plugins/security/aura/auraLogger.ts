export const auraLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[AURA] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[AURA] 👁️📡 ${message}`, ...args);
  },
  scan: (message: string, ...args: any[]) => {
    console.log(`[AURA] 🌊 EMF SCAN: ${message}`, ...args);
  },
  threat: (message: string, ...args: any[]) => {
    console.log(`[AURA] ⚠️ DEVICE DETECTED: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.warn(`[AURA] 🚨 CRITICAL SURVEILLANCE RISK: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[AURA] ❌ SENSOR FAILURE: ${message}`, ...args);
  },
};
