export const sovereignLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[SOVEREIGN] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[SOVEREIGN] 🏛️👑 ${message}`, ...args);
  },
  interface: (message: string, ...args: any[]) => {
    console.warn(`[SOVEREIGN] 🎨 UI MORPH: ${message}`, ...args);
  },
  friend: (message: string, ...args: any[]) => {
    console.log(`[SOVEREIGN] 🤝 HEART SYNC: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[SOVEREIGN] ❌ COMMAND FAILURE: ${message}`, ...args);
  },
};
