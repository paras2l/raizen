export const voidLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[VOID] ${message}`, ...args);
  },
  rotation: (id: string) => {
    console.log(`[VOID] Encryption key rotated → node sync verified (KeyID: ${id})`);
  },
  distribution: (count: number) => {
    console.log(`[VOID] Data distributed → multi-node redundancy confirmed (${count} nodes)`);
  },
  integrity: (status: string) => {
    console.warn(`[VOID] Integrity check: ${status}`);
  },
  blocked: (details: string) => {
    console.error(`[VOID] Access attempt blocked → quantum integrity maintained (${details})`);
  },
  encryption: (status: string) => {
    console.log(`[VOID] 🔒 Encryption state: ${status}`);
  },
  success: (message: string) => {
    console.log(`[VOID] ✅ ${message}`);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[VOID] QUANTUM ERROR: ${message}`, ...args);
  },
};
