export const mythmakerLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[MYTHMAKER] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[MYTHMAKER] 🎭 ${message}`, ...args);
  },
  narrative: (message: string, ...args: any[]) => {
    console.log(`[MYTHMAKER] 📖 NARRATIVE: ${message}`, ...args);
  },
  journey: (message: string, ...args: any[]) => {
    console.log(`[MYTHMAKER] ⚔️ HERO'S JOURNEY: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[MYTHMAKER] ❌ LEGEND ERROR: ${message}`, ...args);
  },
};
