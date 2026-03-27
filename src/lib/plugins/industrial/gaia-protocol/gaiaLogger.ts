import { auditLedger } from '../../../governance';

export const gaiaLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[GAIA] ${message}`;
    console.log(logMsg, data || '');
    
    // Ecosystem infrastructure audit logging
    await auditLedger.append('action_result', {
      source: 'GAIA_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  alert: (message: string, severity: 'MINOR' | 'MAJOR' | 'CRITICAL') => {
    console.warn(`[GAIA] ECOSYSTEM ALERT [${severity}]: ${message}`);
  }
};
