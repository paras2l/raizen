export const aegisLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [AEGIS] ${message}`;
    console.log(entry, data || '');
  }
};
