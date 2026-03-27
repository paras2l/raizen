export const reputationLogger = {
  log: (msg: string) => console.log(`[REPUTATION] ${msg}`),
  warn: (msg: string) => console.warn(`[REPUTATION-WARN] ${msg}`),
  error: (msg: string) => console.error(`[REPUTATION-ERROR] ${msg}`)
};
