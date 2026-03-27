import { auditLedger } from '../../../../governance';

export const equilibriumLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[EQUILIBRIUM] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('biometric_event', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  alert: async (message: string, stressScore: number) => {
    const logMsg = `[EQUILIBRIUM_ALERT] ${message}`;
    console.warn(logMsg, { stressScore });
    
    await auditLedger.append('stress_alert', {
      message,
      stressScore,
      level: 'CRITICAL'
    });
  }
};
