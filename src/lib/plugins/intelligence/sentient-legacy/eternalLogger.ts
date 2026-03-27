export const eternalLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [ETERNAL] ${message}`;
    console.log(entry, data || '');
  }
};
