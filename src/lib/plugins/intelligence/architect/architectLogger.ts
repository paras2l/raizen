export const architectLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ARCHITECT] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ARCHITECT] 🏛️ ${message}`, ...args);
  },
  learning: (message: string, ...args: any[]) => {
    console.log(`[ARCHITECT] 📚 LEARNING: ${message}`, ...args);
  },
  remote: (message: string, ...args: any[]) => {
    console.log(`[ARCHITECT] 🌐 OMNI-LINK: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ARCHITECT] ❌ ORCHESTRATION ERROR: ${message}`, ...args);
  },
};
