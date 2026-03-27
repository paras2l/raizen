export const aegisLogger = {
  log: (msg: string) => console.log(`[AEGIS] ${msg}`),
  success: (msg: string) => console.log(`[AEGIS] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[AEGIS] ERROR: ${msg}`),
  prediction: (prob: number, type: string) => 
    console.warn(`[AEGIS] Crash probability > ${(prob * 100).toFixed(1)}% [${type}] → assets relocation triggered.`),
  allocation: (type: string, amount: number) => 
    console.log(`[AEGIS] Safe Haven allocation complete [${type}]: ${amount} units → risk minimized.`),
  event: (summary: string) => 
    console.log(`[AEGIS] Event summary: ${summary} → stored for analysis.`)
};
