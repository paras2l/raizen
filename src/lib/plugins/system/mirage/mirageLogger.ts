export const mirageLogger = {
  log: (msg: string) => console.log(`[MIRAGE] ${msg}`),
  warn: (msg: string) => console.warn(`[MIRAGE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[MIRAGE-ERROR] ${msg}`),
  decoy: (id: string, action: string) => console.log(`[MIRAGE-DECOY:${id}] ${action}`)
};
