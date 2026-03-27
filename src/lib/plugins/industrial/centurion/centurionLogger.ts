export const centurionLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] 🎮✅ ${message}`, ...args);
  },
  connect: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] 🔗 CONNECTION ESTABLISHED: ${message}`, ...args);
  },
  hijack: (message: string, ...args: any[]) => {
    console.error(`[CENTURION] ⚠️ ASSET SEIZED (FULL POWER): ${message}`, ...args);
  },
  dormant: (message: string, ...args: any[]) => {
    console.log(`[CENTURION] 💤 SYSTEM DORMANT: ${message}`, ...args);
  },
  command: (message: string, ...args: any[]) => {
    console.warn(`[CENTURION] 🕹️ PHYSICAL COMMAND EXECUTED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CENTURION] ❌ CONTROL FAILURE: ${message}`, ...args);
  },
};
