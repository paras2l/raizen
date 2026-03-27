export const intelligenceLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [INTEL-GOD-MODE] ${message}`;
    console.log(entry, data || '');
  }
};
