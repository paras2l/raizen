export const phoenixLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PHOENIX] ${message}`, ...args);
  },
  trigger: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] 🔥 CODEWORD RECEIVED: ${message}`, ...args);
  },
  purge: (message: string, ...args: any[]) => {
    console.warn(`[PHOENIX] 🌐 NETWORK PURGE ACTIVE: ${message}`, ...args);
  },
  wipe: (message: string, ...args: any[]) => {
    console.warn(`[PHOENIX] 💾 HARDWARE WIPE IN PROGRESS: ${message}`, ...args);
  },
  nullify: (message: string, ...args: any[]) => {
    console.log(`[PHOENIX] 🌌 LOG NULLIFICATION: ${message}`, ...args);
  },
  finalized: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] 💀 DESTRUCTION FINALIZED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] ❌ FAILSAFE ERROR: ${message}`, ...args);
  },
};
