import { auditLedger } from '../../../governance';

export const lensLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[LENS] ${message}`;
    console.log(logMsg, data || '');
    
    // Strategic audit logging
    await auditLedger.append('action_result', {
      source: 'LENS_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  signalDetected: (type: string, value: string, intensity: number) => {
    console.log(`[LENS] Signal Identified: [${type}] -> ${value} (Intensity: ${intensity})`);
  }
};
