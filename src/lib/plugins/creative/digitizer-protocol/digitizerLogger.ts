export const digitizerLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [DIGITIZER] ${message}`;
    console.log(entry, data || '');
  }
};
