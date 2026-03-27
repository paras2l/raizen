export const witnessLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [BLACKBOX] ${message}`;
    console.log(entry, data || '');
  }
};
