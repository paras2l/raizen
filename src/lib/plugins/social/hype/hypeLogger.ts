export const hypeLogger = {
  log: (msg: string) => console.log(`[HYPE] ${msg}`),
  warn: (msg: string) => console.warn(`[HYPE-WARN] ${msg}`),
  error: (msg: string) => console.error(`[HYPE-ERROR] ${msg}`)
};
