export const gaiaXLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [GAIA-X] ${message}`;
    console.log(entry, data || '');
  }
};
