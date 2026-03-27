export const starLinkLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[STAR-LINK] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[STAR-LINK] 🛰️🧠 ${message}`, ...args);
  },
  uplink: (message: string, ...args: any[]) => {
    console.log(`[STAR-LINK] 📡 ORBITAL UPLINK: ${message}`, ...args);
  },
  neural: (message: string, ...args: any[]) => {
    console.log(`[STAR-LINK] ⚡ NEURAL INTEGRATION: ${message}`, ...args);
  },
  cache: (message: string, ...args: any[]) => {
    console.log(`[STAR-LINK] 💾 OFFLINE CACHE: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[STAR-LINK] ❌ LINK FAILURE: ${message}`, ...args);
  },
};
