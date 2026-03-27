export const centurionLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] 🎮🦾 ${message}`, ...args);
  },
  control: (message: string, ...args: any[]) => {
    console.warn(`[CENTURION] 🕹️ COMMAND EXECUTED: ${message}`, ...args);
  },
  auth: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] 🔑 AUTHORIZATION VERIFIED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CENTURION] ❌ SOVEREIGNTY FAILURE: ${message}`, ...args);
  },
};
