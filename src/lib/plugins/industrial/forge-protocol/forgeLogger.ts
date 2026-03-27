import { auditLedger } from '../../../governance';

export const forgeLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[FORGE] ${message}`;
    console.log(logMsg, data || '');
    
    // Industrial production audit logging
    await auditLedger.append('action_result', {
      source: 'FORGE_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  productionError: (jobId: string, error: string) => {
    console.error(`[FORGE] PRODUCTION ANOMALY [Job: ${jobId}]: ${error}`);
  }
};
