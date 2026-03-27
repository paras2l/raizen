export const chameleonLogger = {
  log: (msg: string) => console.log(`[CHAMELEON] ${msg}`),
  warn: (msg: string) => console.warn(`[CHAMELEON-WARN] ${msg}`),
  error: (msg: string) => console.error(`[CHAMELEON-ERROR] ${msg}`)
};
