export const nervanaLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[NERVANA] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[NERVANA] ☀️🌩️ ${message}`, ...args);
  },
  risk: (message: string, ...args: any[]) => {
    console.warn(`[NERVANA] ⚠️ COSMIC ACTIVITY DETECTED: ${message}`, ...args);
  },
  mitigation: (message: string, ...args: any[]) => {
    console.log(`[NERVANA] 🛡️ MESH HARDENING: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[NERVANA] ❌ COSMIC SHIELD FAILURE: ${message}`, ...args);
  },
};
