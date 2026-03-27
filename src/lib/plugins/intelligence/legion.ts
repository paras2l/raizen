import { RaizenPlugin, PluginAction, ActionResult } from '../types';
import { auditLedger } from '../../governance';

export interface SubTask {
  id: string;
  task: string;
  specialty: 'code' | 'research' | 'test' | 'creative' | 'general';
  priority: number;
}

export class LegionPlugin implements RaizenPlugin {
  id = 'intelligence.legion';
  name = 'Legion Protocol (Autonomous Swarm)';
  description = 'Autonomous Mitosis: Splits complex tasks into parallel sub-agents for hyper-speed execution.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'mitosis',
      label: 'Execute Mitosis',
      description: 'Split a complex task into multiple specialized parallel workers.',
      category: 'intelligence',
      sensitive: true
    },
    {
      id: 'swarm_status',
      label: 'Swarm Status',
      description: 'Get real-time status of all active sub-agents.',
      category: 'intelligence',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[LEGION] Protocol Online: Ready for Mitosis.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    switch (actionId) {
      case 'mitosis':
        return this.executeMitosis(params, auditEntry.id);
      case 'swarm_status':
        return { success: true, data: { activeWorkers: 0, completedTasks: 0 }, auditId: auditEntry.id };
      default:
        return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
    }
  }

  private async executeMitosis(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const { prompt, deadlineMinutes } = params;
    if (!prompt) return { success: false, error: 'Missing prompt for mitosis.', auditId };

    console.log(`[LEGION] Initiating Mitosis for: "${prompt.substring(0, 50)}..."`);

    // 1. Sophisticated Task Splitting (Simulated structured output)
    const subTasks: SubTask[] = [
      { id: 't1', task: `Search & Analyze latest documentation for: ${prompt}`, specialty: 'research', priority: 1 },
      { id: 't2', task: `Draft core architectural components for: ${prompt}`, specialty: 'code', priority: 2 },
      { id: 't3', task: `Implement critical logic blocks for: ${prompt}`, specialty: 'code', priority: 2 },
      { id: 't4', task: `Generate unit & integration tests for: ${prompt}`, specialty: 'test', priority: 3 }
    ];

    // 2. Deadline-Aware Optimization (Scaling worker count)
    const workerCount = deadlineMinutes && deadlineMinutes < 5 ? subTasks.length : Math.min(subTasks.length, 3);
    console.log(`[LEGION] Scaling requested: ${subTasks.length} tasks -> ${workerCount} active worker threads.`);

    // 3. Parallel Spawning with Error Handling
    try {
      const results = await Promise.all(
        subTasks.slice(0, workerCount).map(async (sub) => {
          try {
            return await this.spawnWorker(sub);
          } catch (e) {
            return { taskId: sub.id, status: 'error', error: e instanceof Error ? e.message : 'Unknown error' };
          }
        })
      );

      // 4. Result Synthesis
      const missionSuccess = results.every(r => r.status === 'completed');

      return { 
        success: true, 
        data: { 
          mission: missionSuccess ? 'Sovereign Execution Successful' : 'Mission Partially Complete',
          spawned: results.length,
          subTasks: subTasks.length,
          detailedResults: results,
          aggregatedOutput: this.synthesizeOutputs(results)
        }, 
        auditId 
      };
    } catch (err: any) {
      return { success: false, error: `Swarm Failure: ${err.message}`, auditId };
    }
  }

  private synthesizeOutputs(results: any[]): string {
    return results
      .filter(r => r.status === 'completed')
      .map(r => `[Task ${r.taskId}] ${r.output}`)
      .join('\n\n');
  }

  private async spawnWorker(subTask: SubTask): Promise<any> {
    // In a full implementation, this calls the internal Agent Factory via IPC.
    console.log(`[LEGION] Spawning [${subTask.specialty}] worker for task ${subTask.id}`);
    
    // Simulate real asynchronous work
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      taskId: subTask.id,
      status: 'completed',
      specialty: subTask.specialty,
      output: `Autonomous contribution for ${subTask.task}`
    };
  }
}

export const legionPlugin = new LegionPlugin();
