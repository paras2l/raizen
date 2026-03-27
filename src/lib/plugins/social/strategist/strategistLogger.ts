export const strategistLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 🌍🛰️ ${message}`, ...args);
  },
  intercept: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 📡 SIGNAL INTERCEPT: ${message}`, ...args);
  },
  analysis: (message: string, ...args: any[]) => {
    console.log(`[STRATEGIST] 🧠 STRATEGIC ANALYSIS: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[STRATEGIST] ❌ INTELLIGENCE ERROR: ${message}`, ...args);
  },
};
