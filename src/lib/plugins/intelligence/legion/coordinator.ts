import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { AgentSpawner } from './spawner';
import { TaskPlanner } from './planner';
import { ResultAggregator } from './aggregator';
import { swarmLogger } from './logger';
import { SwarmConfig, AgentResult, SubTask } from './types';

export class LegionCoordinator implements RaizenPlugin {
  id = 'intelligence.legion';
  name = "Legion Protocol (Autonomous Swarm)";
  description = "God-Tier Multi-Agent Mitosis: Parallelizes complex Raizen missions using a swarm of temporary specialized sub-agents.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private spawner: AgentSpawner;
  private planner: TaskPlanner;
  private aggregator: ResultAggregator;

  constructor(config: SwarmConfig) {
    this.spawner = new AgentSpawner(config);
    this.planner = new TaskPlanner();
    this.aggregator = new ResultAggregator();
  }

  actions: PluginAction[] = [
    {
      id: 'execute_swarm_mission',
      label: 'Deploy Legion Swarm',
      description: 'Decompose and execute a multi-threaded AI mission.',
      category: 'intelligence',
      sensitive: true
    },
    {
      id: 'get_swarm_status',
      label: 'Inspect Active Agents',
      description: 'View real-time status of the worker swarm and performance telemetry.',
      category: 'intelligence',
      sensitive: false
    },
    {
      id: 'emergency_swarm_shutdown',
      label: 'Recall Legion',
      description: 'Force-terminate all active agents and scrub their memory buffers.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[LEGION] Swarm Mitosis Engine Primed. Ready for multi-agent deployment.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'execute_swarm_mission':
          return await this.handleSwarmMission(params, auditEntry.id);
        case 'get_swarm_status':
          return { success: true, data: { activeAgents: this.spawner.getActiveCount(), logs: swarmLogger.getHistory() }, auditId: auditEntry.id };
        case 'emergency_swarm_shutdown':
          this.spawner.shutdownAll();
          swarmLogger.log({ event: 'SHUTDOWN', details: 'All agents manually terminated.' });
          return { success: true, data: { status: 'Terminated' }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async handleSwarmMission(params: Record<string, any>, auditId: string): Promise<ActionResult> {
    const parentTask = {
      id: `task_${Date.now()}`,
      description: params.task || 'Generic Processing',
      payload: params.payload || {},
      priority: params.priority || 1
    };

    swarmLogger.log({ event: 'MISSION_START', details: `New swarm mission: ${parentTask.description}` });

    const subTasks = this.planner.plan(parentTask);
    const results: AgentResult[] = [];

    // Parallel Execution Engine (Mitosis)
    const missionPromises = subTasks.map(async (st: SubTask) => {
      const agent = this.spawner.spawn(st.role);
      if (!agent) {
        return { agentId: 'NULL', subTaskId: st.id, success: false, error: 'Swarm Limit Reached', data: null, durationMs: 0 };
      }

      swarmLogger.log({ event: 'AGENT_SPAWN', agentId: agent.id, role: agent.role, details: `Deploying for: ${st.description}` });

      const res = await agent.run(st);
      
      swarmLogger.log({ 
        event: 'AGENT_COMPLETE', 
        agentId: agent.id, 
        durationMs: res.durationMs, 
        details: res.success ? 'Success' : `Failed: ${res.error}` 
      });

      this.spawner.terminateAgent(agent.id);
      return res;
    });

    const allResults = await Promise.all(missionPromises);
    const finalReport = this.aggregator.aggregate(parentTask.id, allResults);

    swarmLogger.log({ event: 'MISSION_COMPLETE', details: `Final aggregation complete. Managed ${allResults.length} agents.` });

    return { 
      success: finalReport.status === 'success', 
      data: finalReport, 
      auditId 
    };
  }
}

// Global instance with safety defaults
export const legionProtocol = new LegionCoordinator({
  maxAgents: 20,
  agentTimeoutMs: 30000,
  retryAttempts: 2
});
