export const shadowLogger = {
  log: (msg: string) => console.log(`[SHADOW] ${msg}`),
  warn: (msg: string) => console.warn(`[SHADOW-WARN] ${msg}`),
  error: (msg: string) => console.error(`[SHADOW-ERROR] ${msg}`),
  gated: (msg: string) => console.log(`[SHADOW-GATED-ACCESS] ${msg}`)
};
