export const duetLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[DUET] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[DUET] 🎨🎶 ${message}`, ...args);
  },
  capture: (message: string, ...args: any[]) => {
    console.log(`[DUET] 📡 INPUT CAPTURE: ${message}`, ...args);
  },
  prediction: (message: string, ...args: any[]) => {
    console.log(`[DUET] 🧠 PREDICTION: ${message}`, ...args);
  },
  synthesis: (message: string, ...args: any[]) => {
    console.log(`[DUET] ✨ SYNTHESIS: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DUET] ❌ COLLABORATION ERROR: ${message}`, ...args);
  },
};
