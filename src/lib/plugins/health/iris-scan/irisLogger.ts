export const irisLogger = {
  log: (msg: string) => console.log(`[IRIS] ${msg}`),
  info: (msg: string) => console.log(`[IRIS] INFO: ${msg}`),
  success: (msg: string) => console.log(`[IRIS] SUCCESS: ${msg}`),
  error: (msg: string) => console.error(`[IRIS] ERROR: ${msg}`),
  vitalsMeasured: (hr: number, rr: number) => 
    console.log(`[IRIS] Scan complete → Vitals measured: HR ${hr}bpm, RR ${rr}bpm. Flowing to buffer.`),
  anomalyDetected: (type: string, severity: string) => 
    console.warn(`[IRIS] CRITICAL: ${type} [${severity}] detected! Emergency protocol active.`),
  reportTransmitted: (id: string) => 
    console.log(`[IRIS] Summary report ${id} → Transmitted to local first responders via emergency uplink.`)
};
