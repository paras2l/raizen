import { auditLedger } from '../../../../governance';

export const focusLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[FOCUS] ${message}`;
    console.log(logMsg, data || '');
    
    // Log to governance audit for sovereignty tracking
    await auditLedger.append('focus_event', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  warn: async (message: string, data?: any) => {
    const logMsg = `[FOCUS_WARNING] ${message}`;
    console.warn(logMsg, data || '');
    
    await auditLedger.append('focus_warning', {
      message,
      data,
      level: 'HIGH'
    });
  }
};
