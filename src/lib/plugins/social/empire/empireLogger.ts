export const empireLogger = {
  log: (msg: string) => console.log(`[EMPIRE] ${msg}`),
  warn: (msg: string) => console.warn(`[EMPIRE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[EMPIRE-ERROR] ${msg}`)
};
