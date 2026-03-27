export const echoLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ECHO] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ECHO] 🎙️ ${message}`, ...args);
  },
  modulation: (message: string, ...args: any[]) => {
    console.log(`[ECHO] 🎚️ MODULATION: ${message}`, ...args);
  },
  cloning: (message: string, ...args: any[]) => {
    console.log(`[ECHO] 🧬 CLONING: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ECHO] ❌ VOCAL ERROR: ${message}`, ...args);
  },
};
