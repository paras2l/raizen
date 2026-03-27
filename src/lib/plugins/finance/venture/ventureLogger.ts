export const ventureLogger = {
  log: (msg: string) => console.log(`[VENTURE] ${msg}`),
  info: (msg: string) => console.log(`[VENTURE] INFO: ${msg}`),
  success: (msg: string) => console.log(`[VENTURE] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[VENTURE] ERROR: ${msg}`),
  overflow: (resource: string, load: number) => 
    console.warn(`[VENTURE] Task overflow detected [${resource}]: ${(load * 100).toFixed(1)}% overload.`),
  allocation: (nodeId: string, region: string) => 
    console.log(`[VENTURE] Compute node assigned: ${nodeId} [${region}] | Zero footprint confirmed.`),
  completion: (taskId: string) => 
    console.log(`[VENTURE] Task ${taskId} completed → results integrated into local environment.`)
};
