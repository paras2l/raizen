export const sovereignLogger = {
  log: (msg: string) => console.log(`[SOVEREIGN] ${msg}`),
  warn: (msg: string) => console.warn(`[SOVEREIGN-WARN] ${msg}`),
  error: (msg: string) => console.error(`[SOVEREIGN-ERROR] ${msg}`)
};
