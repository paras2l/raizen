export const ledgerLogger = {
  log: (msg: string) => console.log(`[LEDGER] ${msg}`),
  warn: (msg: string) => console.warn(`[LEDGER-WARN] ${msg}`),
  error: (msg: string) => console.error(`[LEDGER-ERROR] ${msg}`)
};
