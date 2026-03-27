export const nexusLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[NEXUS] ${message}`, ...args);
  },
  mesh: (details: string) => {
    console.log(`[NEXUS] Mesh established → ${details}`);
  },
  sync: (details: string) => {
    console.log(`[NEXUS] Threat data synchronized → ${details}`);
  },
  broadcast: (level: string, id: string) => {
    console.log(`[NEXUS] Collective alert active [${level}] → Threat ID: ${id}`);
  },
  shun: (nodeId: string) => {
    console.warn(`[NEXUS] Node SHUNNED → ID: ${nodeId} | malicious drift detected`);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[NEXUS] PROTOCOL FAULT: ${message}`, ...args);
  },
};
