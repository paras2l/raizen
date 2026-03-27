export const diplomatLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[DIPLOMAT] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[DIPLOMAT] 🤝🏙️ ${message}`, ...args);
  },
  profile: (message: string, ...args: any[]) => {
    console.log(`[DIPLOMAT] 👤 PROFILE ANALYSIS: ${message}`, ...args);
  },
  simulation: (message: string, ...args: any[]) => {
    console.log(`[DIPLOMAT] 🎲 NEGOTIATION SIMULATION: ${message}`, ...args);
  },
  script: (message: string, ...args: any[]) => {
    console.log(`[DIPLOMAT] 📜 WINNING SCRIPT GENERATED: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[DIPLOMAT] ❌ DIPLOMACY FAILURE: ${message}`, ...args);
  },
};
