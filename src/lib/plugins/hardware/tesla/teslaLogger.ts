export const teslaLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[TESLA] ${message}`, ...args);
  },
  sovereignty: (status: string) => {
    console.log(`[TESLA] Self-Sovereign Energy active → grid independence ${status}`);
  },
  profit: (details: string) => {
    console.log(`[TESLA] Surplus energy sold → ${details} profit realized`);
  },
  prediction: (details: string) => {
    console.log(`[TESLA] Energy demand predicted → ${details} | no system downtime`);
  },
  balance: (details: string) => {
    console.log(`[TESLA] Battery balancing active → ${details}`);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[TESLA] ENERGY FAULT: ${message}`, ...args);
  }
};
