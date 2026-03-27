import { auditLedger } from '../../../../governance';

export const dreamLearningLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[DREAM-LEARN] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('dream_learning_scheduled', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  retention: async (topicId: string, score: number) => {
    const logMsg = `[DREAM-LEARN] Retention recorded for ${topicId}: ${score}`;
    console.log(logMsg);
    
    await auditLedger.append('retention_recorded', {
      topicId,
      score,
      status: 'LOGGED'
    });
  }
};
