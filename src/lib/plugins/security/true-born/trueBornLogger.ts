export const trueBornLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[TRUE-BORN] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[TRUE-BORN] 👑✅ ${message}`, ...args);
  },
  scan: (message: string, ...args: any[]) => {
    console.log(`[TRUE-BORN] 📡 IDENTITY SCAN: ${message}`, ...args);
  },
  confirm: (message: string, ...args: any[]) => {
    console.warn(`[TRUE-BORN] 🧬 IDENTITY CONFIRMED: ${message}`, ...args);
  },
  deny: (message: string, ...args: any[]) => {
    console.error(`[TRUE-BORN] 🚨 ACCESS DENIED: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.error(`[TRUE-BORN] ⚠️ IDENTITY DRIFT DETECTED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[TRUE-BORN] ❌ VERIFICATION FAILURE: ${message}`, ...args);
  },
};
