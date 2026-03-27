export const oracleLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[ORACLE] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[ORACLE] 🧠🔮 ${message}`, ...args);
  },
  ingestion: (message: string, ...args: any[]) => {
    console.log(`[ORACLE] 🌐 DATA INGESTION: ${message}`, ...args);
  },
  sentiment: (message: string, ...args: any[]) => {
    console.log(`[ORACLE] 🎭 SENTIMENT ANALYSIS: ${message}`, ...args);
  },
  insight: (message: string, ...args: any[]) => {
    console.log(`[ORACLE] ✨ STRATEGIC INSIGHT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ORACLE] ❌ ANALYSIS ERROR: ${message}`, ...args);
  },
};
