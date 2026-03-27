export const directorLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[DIRECTOR] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[DIRECTOR] 🎬 ${message}`, ...args);
  },
  verification: (message: string, ...args: any[]) => {
    console.log(`[DIRECTOR] ✅ VERIFIED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DIRECTOR] ❌ PRODUCTION ERROR: ${message}`, ...args);
  },
};
