export const foundryLogger = {
  log: (msg: string) => console.log(`[FOUNDRY] ${msg}`),
  success: (msg: string) => console.log(`[FOUNDRY] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[FOUNDRY] ERROR: ${msg}`),
  opportunity: (niche: string, score: number) => 
    console.log(`[FOUNDRY] New business identified [${niche}] (Score: ${score}) → launch prep initiated.`),
  live: (name: string) => 
    console.log(`[FOUNDRY] Operations live [${name}] → revenue generation started.`),
  optimized: (name: string, metric: string) => 
    console.log(`[FOUNDRY] Performance optimized [${name}]: ${metric} improved → automated scaling applied.`)
};
