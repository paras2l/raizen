import { auditLedger } from '../../../../governance';

export const dreamLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[DREAM] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('dream_incubation', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  ready: async (briefingId: string, summary: string) => {
    const logMsg = `[DREAM_READY] Morning briefing generated: ${briefingId}`;
    console.log(logMsg);
    
    await auditLedger.append('briefing_ready', {
      briefingId,
      summaryPreview: summary.slice(0, 100),
      status: 'AVAILABLE'
    });
  }
};
