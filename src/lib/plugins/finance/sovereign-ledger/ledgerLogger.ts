export const ledgerLogger = {
  log: (msg: string) => console.log(`[SOVEREIGN] ${msg}`),
  success: (msg: string) => console.log(`[SOVEREIGN] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[SOVEREIGN] ERROR: ${msg}`),
  lawDetected: (country: string, update: string) => 
    console.log(`[SOVEREIGN] New law detected in ${country}: ${update} → simulation run initiated.`),
  strategyCalculated: (rate: number) => 
    console.log(`[SOVEREIGN] Optimal strategy calculated [Effective Rate: ${(rate * 100).toFixed(2)}%] → proposal logged.`),
  compliance: (status: string) => 
    console.log(`[SOVEREIGN] Compliance check → ${status}. Verified against global standards.`)
};
