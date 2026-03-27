export const codeSmithLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CODESMITH] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[CODESMITH] 🛠️🚀 ${message}`, ...args);
  },
  parsing: (message: string, ...args: any[]) => {
    console.log(`[CODESMITH] 🧠 IDEA PARSING: ${message}`, ...args);
  },
  coding: (message: string, ...args: any[]) => {
    console.log(`[CODESMITH] 💻 AUTO CODING: ${message}`, ...args);
  },
  deploy: (message: string, ...args: any[]) => {
    console.log(`[CODESMITH] 🌍 DEPLOYMENT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CODESMITH] ❌ SPAWNING ERROR: ${message}`, ...args);
  },
};
