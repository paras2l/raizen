import { auditLedger } from '../../../../governance';

export const empathyLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[EMPATHY] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('emotional_sync_event', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  pacing: async (delayMs: number, reason: string) => {
    const logMsg = `[EMPATHY] Decision pacing adjustment applied: ${delayMs}ms. Reason: ${reason}`;
    console.log(logMsg);
    
    await auditLedger.append('decision_pacing_applied', {
      delayMs,
      reason,
      status: 'STABILIZED'
    });
  }
};
