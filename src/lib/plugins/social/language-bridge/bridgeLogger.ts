export const bridgeLogger = {
  log: (msg: string) => console.log(`[BRIDGE] ${msg}`),
  warn: (msg: string) => console.warn(`[BRIDGE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[BRIDGE-ERROR] ${msg}`)
};
