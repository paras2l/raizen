export const sanctuaryLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[SANCTUARY] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[SANCTUARY] 🛡️✅ ${message}`, ...args);
  },
  zone: (message: string, ...args: any[]) => {
    console.warn(`[SANCTUARY] 🏳️ ZONE ENFORCED: ${message}`, ...args);
  },
  sensor: (message: string, ...args: any[]) => {
    console.log(`[SANCTUARY] 🚫 SENSOR GATED: ${message}`, ...args);
  },
  audit: (message: string, ...args: any[]) => {
    console.log(`[SANCTUARY] 📜 ZONE AUDIT: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[SANCTUARY] 🚨 PRIVACY BREACH ATTEMPT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[SANCTUARY] ❌ OPERATIONAL FAILURE: ${message}`, ...args);
  },
};
