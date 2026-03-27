export const outreachLogger = {
  log: (msg: string) => console.log(`[OUTREACH] ${msg}`),
  warn: (msg: string) => console.warn(`[OUTREACH-WARN] ${msg}`),
  error: (msg: string) => console.error(`[OUTREACH-ERROR] ${msg}`)
};
