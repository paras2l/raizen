import { auditLedger } from '../../../../governance';

export const sovereignLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[SOVEREIGN] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('hazard_identified', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  alert: async (id: string, level: string) => {
    const logMsg = `[SOVEREIGN] Tactical alert issued: ${id} (${level})`;
    console.log(logMsg);
    
    await auditLedger.append('tactical_alert_issued', {
      alertId: id,
      level,
      status: 'OPTIMIZED'
    });
  }
};
