export const bardLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[BARD] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[BARD] 🎨🎬 ${message}`, ...args);
  },
  gaming: (message: string, ...args: any[]) => {
    console.warn(`[BARD] 🎮 AVATAR ACTIVE: ${message}`, ...args);
  },
  media: (message: string, ...args: any[]) => {
    console.log(`[BARD] 📽️ SYNTHESIS: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[BARD] ❌ PRODUCTION FAILURE: ${message}`, ...args);
  },
};
