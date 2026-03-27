export const nexusLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] 🌐✨ ${message}`, ...args);
  },
  discovery: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] 📡 NODE DISCOVERY: ${message}`, ...args);
  },
  sync: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] 🔄 CROSS-NODE SYNC: ${message}`, ...args);
  },
  mesh: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] 🕸️ MESH INTEGRITY: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[NEXUS] ❌ OMNIPRESENCE ERROR: ${message}`, ...args);
  },
};
