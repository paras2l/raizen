export const keysLogger = {
  log: async (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [KEYS] ${message}`;
    console.log(entry, data || '');
    // Integration with global AuditLedger would go here
  }
};
