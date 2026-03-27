export const parallelLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [PARALLEL] ${message}`;
    console.log(entry, data || '');
  }
};
