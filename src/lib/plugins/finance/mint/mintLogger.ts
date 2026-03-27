export const mintLogger = {
  log: (msg: string) => console.log(`[MINT] ${msg}`),
  info: (msg: string) => console.log(`[MINT] INFO: ${msg}`),
  success: (msg: string) => console.log(`[MINT] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[MINT] ERROR: ${msg}`),
  trustCreated: (id: string, jurisdiction: string) => 
    console.log(`[MINT] New trust created [${id}] → jurisdiction optimized: ${jurisdiction}`),
  txExecuted: (taskId: string) => 
    console.log(`[MINT] Asset transfer executed [${taskId}] → full compliance verified.`),
  audit: (status: string) => 
    console.log(`[MINT] Global audit check → system ${status}.`)
};
