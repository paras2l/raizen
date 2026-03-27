export const authorityLogger = {
  log: (msg: string) => console.log(`[AUTHORITY] ${msg}`),
  warn: (msg: string) => console.warn(`[AUTHORITY-WARN] ${msg}`),
  error: (msg: string) => console.error(`[AUTHORITY-ERROR] ${msg}`)
};
