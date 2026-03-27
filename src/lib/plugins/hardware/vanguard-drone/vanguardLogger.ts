export const vanguardLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [VANGUARD] ${message}`;
    console.log(entry, data || '');
  }
};
