export const preservationLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [ETERNAL ORBIT] ${message}`;
    console.log(entry, data || '');
  }
};
