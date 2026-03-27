export const socialGraphLogger = {
  log: (msg: string) => console.log(`[SOCIAL-GRAPH] ${msg}`),
  warn: (msg: string) => console.warn(`[SOCIAL-GRAPH-WARN] ${msg}`),
  error: (msg: string) => console.error(`[SOCIAL-GRAPH-ERROR] ${msg}`)
};
