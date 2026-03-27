export const shieldLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[SHIELD] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[SHIELD] 🛡️⚠️ ${message}`, ...args);
  },
  threat: (message: string, ...args: any[]) => {
    console.warn(`[SHIELD] 🚨 MANIPULATION DETECTED: ${message}`, ...args);
  },
  advisory: (message: string, ...args: any[]) => {
    console.log(`[SHIELD] 🔈 WHISPERING STRATEGY: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[SHIELD] ❌ SHIELD FAILURE: ${message}`, ...args);
  },
};
