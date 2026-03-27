export const illusionistLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ILLUSIONIST] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ILLUSIONIST] 🪄 ${message}`, ...args);
  },
  overlay: (message: string, ...args: any[]) => {
    console.log(`[ILLUSIONIST] ✨ OVERLAY: ${message}`, ...args);
  },
  synthesis: (message: string, ...args: any[]) => {
    console.log(`[ILLUSIONIST] 🌌 SYNTHESIS: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ILLUSIONIST] ❌ REALITY ERROR: ${message}`, ...args);
  },
};
