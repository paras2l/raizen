import { auditLedger } from '../../../../governance';

export const eurekaLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[EUREKA] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('insight_capture', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  archive: async (snapshotId: string, topic: string) => {
    const logMsg = `[EUREKA_ARCHIVE] Concept snapshot ${snapshotId} stored under ${topic}.`;
    console.log(logMsg);
    
    await auditLedger.append('idea_archived', {
      snapshotId,
      topic,
      status: 'IMMUTABLE'
    });
  }
};
