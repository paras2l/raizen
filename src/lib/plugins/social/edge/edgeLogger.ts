export const edgeLogger = {
  log: (msg: string) => console.log(`[EDGE] ${msg}`),
  warn: (msg: string) => console.warn(`[EDGE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[EDGE-ERROR] ${msg}`)
};
