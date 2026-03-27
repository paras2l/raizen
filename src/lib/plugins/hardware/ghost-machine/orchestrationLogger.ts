import { auditLedger } from '../../../governance';

export const orchestrationLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[GHOST] ${message}`;
    console.log(logMsg, data || '');
    
    // Using existing governance category or generic event
    await auditLedger.append('action_result', {
      source: 'GHOST_MACHINE',
      message,
      data,
      timestamp: Date.now()
    });
  },

  deviceAction: async (deviceId: string, action: string, status: string) => {
    console.log(`[GHOST] Device ${deviceId} execution: ${action} -> [${status}]`);
  }
};
