import { auditLedger } from '../../../governance';

export const sentinelLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[SENTINEL] ${message}`;
    console.log(logMsg, data || '');
    
    // Security audit logging
    await auditLedger.append('action_result', {
      source: 'SENTINEL_ARRAY',
      message,
      data,
      timestamp: Date.now()
    });
  },

  breachDetected: (location: string, threatLevel: number) => {
    console.warn(`[SENTINEL] BREACH DETECTED @ ${location} [Threat: ${threatLevel}]`);
  }
};
