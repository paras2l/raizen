export const titanLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [TITAN] ${message}`;
    console.log(entry, data || '');
  }
};
