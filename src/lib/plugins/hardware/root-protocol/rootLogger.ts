export const rootLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [ROOT] ${message}`;
    console.log(entry, data || '');
  }
};
