export const navigatorLogger = {
  log: (msg: string) => console.log(`[NAVIGATOR] ${msg}`),
  warn: (msg: string) => console.warn(`[NAVIGATOR-WARN] ${msg}`),
  error: (msg: string) => console.error(`[NAVIGATOR-ERROR] ${msg}`)
};
