export const sentinelLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [SENTINEL-SWARM] ${message}`;
    console.log(entry, data || '');
  }
};
