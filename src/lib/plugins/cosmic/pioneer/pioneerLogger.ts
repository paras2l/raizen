export const pioneerLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PIONEER] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[PIONEER] 🔭✨ ${message}`, ...args);
  },
  capture: (message: string, ...args: any[]) => {
    console.log(`[PIONEER] 📡 COSMIC CAPTURE: ${message}`, ...args);
  },
  analysis: (message: string, ...args: any[]) => {
    console.log(`[PIONEER] 🧠 ASTROPHYSICAL ANALYSIS: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.log(`[PIONEER] 🚨 FRONTIER ALERT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PIONEER] ❌ COSMIC INTERFERENCE: ${message}`, ...args);
  },
};
