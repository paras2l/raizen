import { auditLedger } from '../../../../governance';

export const memoryLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[MEMORY] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('memory_recall_request', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  reconstructed: async (context: string) => {
    const logMsg = `[MEMORY] Context reconstruction initiated: ${context}`;
    console.log(logMsg);
    
    await auditLedger.append('context_reconstructed', {
      context,
      status: 'COMPLETE'
    });
  }
};
