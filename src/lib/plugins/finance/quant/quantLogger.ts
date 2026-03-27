export const quantLogger = {
  log: (msg: string) => console.log(`[QUANT] ${msg}`),
  info: (msg: string) => console.log(`[QUANT] INFO: ${msg}`),
  success: (msg: string) => console.log(`[QUANT] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[QUANT] ERROR: ${msg}`),
  signal: (symbol: string, type: string, conf: number) => 
    console.log(`[QUANT] Signal Dispatched: ${type} ${symbol} | Accuracy: ${(conf * 100).toFixed(2)}%`),
  anomaly: (type: string, details: string) => 
    console.warn(`[QUANT] Market Anomaly Detected [${type}]: ${details}`)
};
