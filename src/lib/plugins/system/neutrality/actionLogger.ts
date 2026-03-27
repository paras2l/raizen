export const neutralityLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[NEUTRALITY] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[NEUTRALITY] ⚖️✅ ${message}`, ...args);
  },
  flag: (message: string, ...args: any[]) => {
    console.warn(`[NEUTRALITY] ⚠️ TASK FLAGGED: ${message}`, ...args);
  },
  pause: (message: string, ...args: any[]) => {
    console.error(`[NEUTRALITY] ⏸️ EXECUTION PAUSED: ${message}`, ...args);
  },
  confirm: (message: string, ...args: any[]) => {
    console.warn(`[NEUTRALITY] 👤 USER SOVEREIGNTY CONFIRMED: ${message}`, ...args);
  },
  audit: (message: string, ...args: any[]) => {
    console.log(`[NEUTRALITY] 📜 AUDIT LOG FINALIZED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[NEUTRALITY] ❌ FAILSAFE ERROR: ${message}`, ...args);
  },
};
