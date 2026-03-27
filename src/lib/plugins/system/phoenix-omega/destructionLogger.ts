export const phoenixLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PHOENIX] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[PHOENIX] 🔥✅ ${message}`, ...args);
  },
  initiation: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] ☢️ DESTRUCTION SEQUENCE INITIATED: ${message}`, ...args);
  },
  erasure: (message: string, ...args: any[]) => {
    console.warn(`[PHOENIX] 🗑️ ERASURE IN PROGRESS: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] 🚨 NUCLEAR CODEWORD RECEIVED: ${message}`, ...args);
  },
  termination: (message: string, ...args: any[]) => {
    console.log(`[PHOENIX] ⬛ MISSION TERMINATED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PHOENIX] ❌ SEQUENCE FAILURE: ${message}`, ...args);
  },
};
