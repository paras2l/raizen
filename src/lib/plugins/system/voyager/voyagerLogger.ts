export const voyagerLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [VOYAGER] ${message}`;
    console.log(entry, data || '');
  }
};
