export const legisLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[LEGIS] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[LEGIS] ⚖️🔮 ${message}`, ...args);
  },
  forecast: (message: string, ...args: any[]) => {
    console.log(`[LEGIS] ✨ LAW FORECAST: ${message}`, ...args);
  },
  alert: (message: string, ...args: any[]) => {
    console.warn(`[LEGIS] 🚨 REGULATORY ALERT: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[LEGIS] ❌ LEGAL ANALYSIS FAILURE: ${message}`, ...args);
  },
};
