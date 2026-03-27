export const metaLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [OVERLAY] ${message}`;
    console.log(entry, data || '');
  }
};
