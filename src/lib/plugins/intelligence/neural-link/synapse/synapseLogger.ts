import { auditLedger } from '../../../../governance';

export const synapseLogger = {
  log: async (message: string, data?: any) => {
    const logMsg = `[SYNAPSE] ${message}`;
    console.log(logMsg, data || '');
    
    await auditLedger.append('intent_prediction', {
      message,
      data,
      timestamp: Date.now()
    });
  },

  optimized: async (workflowId: string, latencyReductionMs: number) => {
    const logMsg = `[SYNAPSE_OPTIMIZED] Workflow ${workflowId} accelerated by ${latencyReductionMs}ms.`;
    console.log(logMsg);
    
    await auditLedger.append('workflow_optimized', {
      workflowId,
      latencyReductionMs,
      status: 'ULTRA_FAST'
    });
  }
};
