import { auditLedger } from '../../../governance';

export const zoneLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[ZONE] ${message}`;
    console.log(logMsg, data || '');
    
    // Acoustic audit logging
    await auditLedger.append('action_result', {
      source: 'ZONE_PROTOCOL',
      message,
      data,
      timestamp: Date.now()
    });
  },

  signalProjected: (mode: string, freq: number, zoneId: string) => {
    console.log(`[ZONE] Directional Signal Projected: ${mode} (${freq}Hz) -> Zone: ${zoneId}`);
  }
};
