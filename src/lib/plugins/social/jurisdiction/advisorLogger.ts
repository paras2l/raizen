export const advisorLogger = {
  log: (msg: string) => console.log(`[JURISDICTION] ${msg}`),
  warn: (msg: string) => console.warn(`[JURISDICTION-WARN] ${msg}`),
  error: (msg: string) => console.error(`[JURISDICTION-ERROR] ${msg}`)
};
