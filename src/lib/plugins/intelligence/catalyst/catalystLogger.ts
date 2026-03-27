export const catalystLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CATALYST] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[CATALYST] 🔬⚡ ${message}`, ...args);
  },
  research: (message: string, ...args: any[]) => {
    console.warn(`[CATALYST] 📚 BREAKTHROUGH: ${message}`, ...args);
  },
  simulation: (message: string, ...args: any[]) => {
    console.log(`[CATALYST] 🧪 SIMULATION: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CATALYST] ❌ INNOVATION FAILURE: ${message}`, ...args);
  },
};
