export const helaLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [HELA] ${message}`;
    console.log(entry, data || '');
  }
};
