export const planetaryLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [NODE] ${message}`;
    console.log(entry, data || '');
  }
};
