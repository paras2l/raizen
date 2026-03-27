export const babelLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [BABEL] ${message}`;
    console.log(entry, data || '');
  }
};
