export const aegisLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[AEGIS-SHIELD] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[AEGIS-SHIELD] 🛡️🌍 ${message}`, ...args);
  },
  risk: (message: string, ...args: any[]) => {
    console.warn(`[AEGIS-SHIELD] ⚠️ RISK DETECTED: ${message}`, ...args);
  },
  relocate: (message: string, ...args: any[]) => {
    console.log(`[AEGIS-SHIELD] 🚚 RELOCATION INITIATED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[AEGIS-SHIELD] ❌ PROTECTION FAILURE: ${message}`, ...args);
  },
};
