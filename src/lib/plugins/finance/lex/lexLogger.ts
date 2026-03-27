export const lexLogger = {
  log: (msg: string) => console.log(`[LEX] ${msg}`),
  success: (msg: string) => console.log(`[LEX] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[LEX] ERROR: ${msg}`),
  scan: (title: string) => 
    console.log(`[LEX] Contract uploaded [${title}] → scan complete. Loops & Hidden Traps analyzed.`),
  risk: (type: string, level: string) => 
    console.warn(`[LEX] Risk flagged [${type} - ${level}] → edit suggested to minimize exposure.`),
  finalized: (id: string, version: string) => 
    console.log(`[LEX] Draft finalized [${id}] (v${version}) → version logged. Encrypted in sovereign vault.`)
};
