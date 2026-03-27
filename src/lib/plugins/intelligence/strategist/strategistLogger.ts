export const strategistLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 📡🛰️ ${message}`, ...args);
  },
  intercept: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 🧿 DATA INTERCEPTED: ${message}`, ...args);
  },
  dominance: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 🦾 SIGNAL DOMINANCE ACTIVE: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[STRATEGIST] ❌ INTERCEPTION FAILURE: ${message}`, ...args);
  },
};
