import { auditLedger } from '../../../governance';

export const vitalLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[VITAL] ${message}`;
    console.log(logMsg, data || '');
    
    // Health discovery audit logging (Private/Encrypted via Ledger)
    await auditLedger.append('action_result', {
      source: 'VITAL_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  anomalyDetected: (metric: string, severity: string) => {
    console.warn(`[VITAL] PHYSIOLOGICAL ANOMALY: ${metric} [Severity: ${severity}]`);
  }
};
