export const dreamReelLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[DREAMREEL] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[DREAMREEL] 🧠🎬 ${message}`, ...args);
  },
  neural: (message: string, ...args: any[]) => {
    console.log(`[DREAMREEL] ⚡ NEURAL CAPTURE: ${message}`, ...args);
  },
  cinema: (message: string, ...args: any[]) => {
    console.log(`[DREAMREEL] 🎥 CINEMA SYNTHESIS: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DREAMREEL] ❌ PRODUCTION ERROR: ${message}`, ...args);
  },
};
