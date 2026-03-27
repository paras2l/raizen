export const innerCircleLogger = {
  log: (msg: string) => console.log(`[INNER-CIRCLE] ${msg}`),
  warn: (msg: string) => console.warn(`[INNER-CIRCLE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[INNER-CIRCLE-ERROR] ${msg}`)
};
