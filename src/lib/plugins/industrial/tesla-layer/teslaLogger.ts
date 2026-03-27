import { auditLedger } from '../../../governance';

export const teslaLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[TESLA] ${message}`;
    console.log(logMsg, data || '');
    
    // Energy infrastructure audit logging
    await auditLedger.append('action_result', {
      source: 'TESLA_LAYER',
      message,
      data,
      timestamp: Date.now()
    });
  },

  alert: (message: string, severity: 'WARNING' | 'CRITICAL') => {
    console.warn(`[TESLA] POWER ALERT [${severity}]: ${message}`);
  }
};
