export const nomadLogger = {
  log: (msg: string) => console.log(`[NOMAD] ${msg}`),
  success: (msg: string) => console.log(`[NOMAD] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[NOMAD] ERROR: ${msg}`),
  opportunity: (spread: number, countries: string[]) => 
    console.log(`[NOMAD] Arbitrage opportunity detected [${(spread * 100).toFixed(2)}%] between ${countries.join(' ↔ ')}`),
  transfer: (amount: number, symbol: string) => 
    console.log(`[NOMAD] Funds moved: ${amount} ${symbol} → ROI optimized.`),
  compliance: (status: string) => 
    console.log(`[NOMAD] Compliance check → ${status}.`)
};
