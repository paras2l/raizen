export const cabalLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CABAL] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[CABAL] 🕸️🕵️ ${message}`, ...args);
  },
  map: (message: string, ...args: any[]) => {
    console.log(`[CABAL] 🗺️ INFLUENCE MAP GENERATED: ${message}`, ...args);
  },
  insight: (message: string, ...args: any[]) => {
    console.log(`[CABAL] 💡 STRATEGIC INSIGHT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CABAL] ❌ ANALYSIS FAILURE: ${message}`, ...args);
  },
};
