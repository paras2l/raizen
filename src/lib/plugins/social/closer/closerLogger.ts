export const closerLogger = {
  log: (msg: string) => console.log(`[CLOSER] ${msg}`),
  warn: (msg: string) => console.warn(`[CLOSER-WARN] ${msg}`),
  error: (msg: string) => console.error(`[CLOSER-ERROR] ${msg}`)
};
