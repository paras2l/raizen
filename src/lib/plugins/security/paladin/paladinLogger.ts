export const paladinLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PALADIN] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[PALADIN] 🛡️🔥 ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.warn(`[PALADIN] ⚡ THREAT DETECTED: ${message}`, ...args);
  },
  defense: (message: string, ...args: any[]) => {
    console.log(`[PALADIN] 🛡️ DEFENSIVE ACTION: ${message}`, ...args);
  },
  offensive: (message: string, ...args: any[]) => {
    console.error(`[PALADIN] ⚔️ OFFENSIVE MANEUVER: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PALADIN] ❌ SYSTEM COMPROMISE ATTEMPT: ${message}`, ...args);
  },
};
