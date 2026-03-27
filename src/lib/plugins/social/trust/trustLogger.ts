export const trustLogger = {
  log: (msg: string) => console.log(`[TRUST] ${msg}`),
  warn: (msg: string) => console.warn(`[TRUST-WARN] ${msg}`),
  error: (msg: string) => console.error(`[TRUST-ERROR] ${msg}`)
};
