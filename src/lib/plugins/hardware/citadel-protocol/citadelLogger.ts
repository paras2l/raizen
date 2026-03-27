import { auditLedger } from '../../../governance';

export const citadelLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[CITADEL] ${message}`;
    console.log(logMsg, data || '');
    
    // Urban discovery audit logging
    await auditLedger.append('action_result', {
      source: 'CITADEL_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  routeUpdated: (routeId: string, type: string) => {
    console.log(`[CITADEL] Navigation Update: [${type}] Routing via ${routeId}`);
  }
};
