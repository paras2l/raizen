export const anchorLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ANCHOR] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ANCHOR] ⚓✅ ${message}`, ...args);
  },
  gate: (message: string, ...args: any[]) => {
    console.warn(`[ANCHOR] ⛩️ COMMAND GATED: ${message}`, ...args);
  },
  audit: (message: string, ...args: any[]) => {
    console.log(`[ANCHOR] 📜 AUDIT LOGGED: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[ANCHOR] 🚨 UNAUTHORIZED ATTEMPT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ANCHOR] ❌ AUTH FAILURE: ${message}`, ...args);
  },
};
