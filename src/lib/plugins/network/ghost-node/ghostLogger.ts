export const ghostLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[GHOST] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[GHOST] 🌌✅ ${message}`, ...args);
  },
  fragment: (message: string, ...args: any[]) => {
    console.log(`[GHOST] 🧩 FRAGMENT DEPLOYED: ${message}`, ...args);
  },
  sync: (message: string, ...args: any[]) => {
    console.log(`[GHOST] 🛰️ NODE SYNCHRONIZED: ${message}`, ...args);
  },
  erasure: (message: string, ...args: any[]) => {
    console.warn(`[GHOST] 🧹 INTRUSION ERASED: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[GHOST] 🚨 TRACKING ATTEMPT BLOCKED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[GHOST] ❌ OMNIPRESENCE FAILURE: ${message}`, ...args);
  },
};
