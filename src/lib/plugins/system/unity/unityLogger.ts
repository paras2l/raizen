export const unityLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [UNITY] ${message}`;
    console.log(entry, data || '');
  }
};
