import { auditLedger } from '../../../../governance';

export const thoughtCodeLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[THOUGHT-CODE] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('thought_synthesis_start', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  info: (message: string) => {
    console.log(`[THOUGHT-CODE] ${message}`);
  }
};
