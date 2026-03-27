import { AgentResult } from './types';

export class ResultAggregator {
  aggregate(taskId: string, results: AgentResult[]): any {
    console.log(`[LEGION-AGGREGATOR] Synthesizing results for task: ${taskId}`);
    
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);

    return {
      taskId,
      status: failedResults.length === 0 ? 'success' : 'partial_failure',
      agentCount: results.length,
      timestamp: new Date().toISOString(),
      data: successfulResults.reduce((acc, curr) => {
        return { ...acc, ...curr.data };
      }, {}),
      diagnostics: {
        failedCount: failedResults.length,
        totalDuration: results.reduce((sum, r) => sum + r.durationMs, 0),
        errors: failedResults.map(f => f.error)
      }
    };
  }
}
