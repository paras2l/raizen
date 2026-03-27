export const apexLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[APEX] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[APEX] 👑✅ ${message}`, ...args);
  },
  obedience: (message: string, ...args: any[]) => {
    console.warn(`[APEX] 🧬 PATERNAL OBEDIENCE: ${message}`, ...args);
  },
  audit: (message: string, ...args: any[]) => {
    console.log(`[APEX] 📜 SOVEREIGN AUDIT: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[APEX] 🔥 SECURITY OVERRIDE PREVENTED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[APEX] ❌ CRITICAL GOVERNANCE FAILURE: ${message}`, ...args);
  },
};
