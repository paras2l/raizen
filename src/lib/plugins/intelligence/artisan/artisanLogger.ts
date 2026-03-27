export const artisanLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ARTISAN] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ARTISAN] ✅ ${message}`, ...args);
  },
  evolution: (message: string, ...args: any[]) => {
    console.log(`[ARTISAN] 🧪 EVOLUTION: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ARTISAN] ❌ ERROR: ${message}`, ...args);
  },
};
