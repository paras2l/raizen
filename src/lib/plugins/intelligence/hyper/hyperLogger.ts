export const hyperLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [SINGULARITY] ${message}`;
    console.log(entry, data || '');
  }
};
