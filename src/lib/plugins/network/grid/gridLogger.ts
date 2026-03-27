export const gridLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[GRID] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[GRID] 🌐🦾 ${message}`, ...args);
  },
  tunnel: (message: string, ...args: any[]) => {
    console.warn(`[GRID] 🧿 TUNNEL ACTIVE: ${message}`, ...args);
  },
  routing: (message: string, ...args: any[]) => {
    console.log(`[GRID] 🔀 ROUTING OPTIMIZED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[GRID] ❌ MESH FAILURE: ${message}`, ...args);
  },
};
