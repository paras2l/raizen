import { auditLedger } from '../../../governance';

export const starLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[STAR] ${message}`;
    console.log(logMsg, data || '');
    
    // Low-footprint audit logging
    await auditLedger.append('action_result', {
      source: 'STAR_PROTOCOL',
      message,
      data: data ? 'ELIDED_FOR_STEALTH' : null, // Masking payload by default
      timestamp: Date.now()
    });
  },

  relayEvent: async (relayId: string, event: string) => {
    console.log(`[STAR] Relay Transition [${relayId}]: ${event}`);
  }
};
