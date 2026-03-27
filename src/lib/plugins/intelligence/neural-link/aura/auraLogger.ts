import { auditLedger } from '../../../../governance';

export const auraLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[AURA] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('aura_state_shift', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  sync: async (state: any) => {
    const logMsg = `[AURA_SYNC] Bio-identity synchronized with mode: ${state.mode}`;
    console.log(logMsg);
    
    await auditLedger.append('bio_identity_sync', {
      state,
      status: 'SYNCHRONIZED'
    });
  }
};
