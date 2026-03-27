export const phantomLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[🔱 PHANTOM] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[🔱 PHANTOM] 🟢 ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[🔱 PHANTOM] ⚠️ ${message}`, ...args);
  },
  scan: (message: string, ...args: any[]) => {
    console.log(`[🔱 PHANTOM] 📡 SPECTRUM SCAN: ${message}`, ...args);
  },
  broadcast: (message: string, ...args: any[]) => {
    console.log(`[🔱 PHANTOM] ⚡ INDUCTION ACTIVE: ${message}`, ...args);
  },
  encryption: (message: string, ...args: any[]) => {
    console.log(`[🔱 PHANTOM] 🔐 GHOST-ENCRYPTION: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[🔱 PHANTOM] ❌ BREACH ATTEMPT: ${message}`, ...args);
  },
};
