export const passportLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PASSPORT] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[PASSPORT] 🛂🌐 ${message}`, ...args);
  },
  presence: (message: string, ...args: any[]) => {
    console.log(`[PASSPORT] 👤 VIRTUAL PRESENCE UPDATED: ${message}`, ...args);
  },
  access: (message: string, ...args: any[]) => {
    console.log(`[PASSPORT] 🌉 BORDER CROSSED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PASSPORT] ❌ ACCESS FAILURE: ${message}`, ...args);
  },
};
