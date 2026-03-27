export const maestroLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[MAESTRO] ${message}`, ...args);
  },
  info: (message: string, ...args: any[]) => {
    console.log(`[MAESTRO] INFO: ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[MAESTRO] 🎨🏛️ ${message}`, ...args);
  },
  analysis: (message: string, ...args: any[]) => {
    console.log(`[MAESTRO] 🔍 DNA ANALYSIS: ${message}`, ...args);
  },
  emulation: (message: string, ...args: any[]) => {
    console.log(`[MAESTRO] ✨ STYLE EMULATION: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[MAESTRO] ❌ SYNTHESIS ERROR: ${message}`, ...args);
  },
};
