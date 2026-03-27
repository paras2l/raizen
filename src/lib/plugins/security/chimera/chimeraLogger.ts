export const chimeraLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[CHIMERA] ${message}`, ...args);
  },
  projection: (nodeId: string, location: string) => {
    console.log(`[CHIMERA] Node projection activated → ${nodeId} (${location}) live`);
  },
  deception: (tracker: string) => {
    console.log(`[CHIMERA] Trackers deceived (${tracker}) → activity normal`);
  },
  confirmed: (count: number) => {
    console.log(`[CHIMERA] Presence confirmed across ${count} global nodes → no exposure`);
  },
  alert: (details: string) => {
    console.error(`[CHIMERA] ⚠️ ANOMALY DETECTED: ${details}`);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CHIMERA] PROTOCOL ERROR: ${message}`, ...args);
  },
};
