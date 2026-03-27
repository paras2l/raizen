export const silencerLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[SILENCER] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[SILENCER] 🔇✨ ${message}`, ...args);
  },
  scan: (message: string, ...args: any[]) => {
    console.log(`[SILENCER] 📡 LOCAL SCAN: ${message}`, ...args);
  },
  jamming: (message: string, ...args: any[]) => {
    console.log(`[SILENCER] 🌩️ JAMMING SEQUENCE: ${message}`, ...args);
  },
  safety: (message: string, ...args: any[]) => {
    console.log(`[SILENCER] 🛡️ FREQUENCY OVERRIDE: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[SILENCER] ❌ BLACKOUT ERROR: ${message}`, ...args);
  },
};
