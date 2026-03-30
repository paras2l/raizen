import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { RaizenBasePlugin } from '../../base';
import { DeadlineParser } from './deadline-parser';
import { UrgencyAnalyzer } from './urgency-analyzer';
import { AgentScalingEngine } from './scaling-engine';
import { ParallelTaskAllocator } from './task-allocator';
import { ResourceBudgetManager } from './budget-manager';

export class OverclockPlugin extends RaizenBasePlugin {
  id = 'overclock-protocol';
  name = 'Timeline-Driven Scaling (Overclock)';
  description = 'Dynamically scales the number of temporary sub-agents based on task deadlines.';
  status: 'online' | 'offline' | 'connecting' | 'error' = 'online';

  private parser = new DeadlineParser();
  private analyzer = new UrgencyAnalyzer();
  private engine = new AgentScalingEngine();
  private allocator = new ParallelTaskAllocator();
  private budget = new ResourceBudgetManager();

  private currentSwarmSize: number = 2;
  private currentUrgency: number = 0.1;

  actions: PluginAction[] = [
    {
      id: 'scale-swarm',
      label: 'Scale Swarm',
      description: 'Increase or decrease sub-agent count based on urgency.',
      category: 'system' as any,
      sensitive: true
    },
    {
       id: 'set_deadline',
       label: 'Set Deadline',
       description: 'Scale the swarm based on a specific project timeline.',
       category: 'system' as any,
       sensitive: false
    },
    {
      id: 'get_swarm_metrics',
      label: 'Swarm Telemetry',
      description: 'Retrieve real-time swarm scaling and efficiency metrics.',
      category: 'system' as any,
      sensitive: false
    },
    {
      id: 'optimize-efficiency',
      label: 'Optimize Efficiency',
      description: 'Retire unnecessary agents to conserve energy.',
      category: 'system' as any,
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await super.initialize();
    console.log('[OVERCLOCK] Scaling controller active.');
    
    this.onEvent('SYSTEM_LOCKDOWN_COMMAND', (data) => {
        this.log(`Received system lockdown command: ${data.reason}. Scaling down to ECO_MODE.`);
        this.execute('optimize-efficiency', {});
    });
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    switch (actionId) {
      case 'set_deadline':
        return await this.handleDeadline(params);
      case 'scale-swarm':
        return await this.handleScaling(params);
      case 'get_swarm_metrics':
        return { success: true, data: { swarmSize: this.currentSwarmSize, urgency: this.currentUrgency, budget: this.budget.getBudget() } };
      case 'optimize-efficiency':
        this.currentSwarmSize = Math.max(2, Math.floor(this.currentSwarmSize * 0.5));
        return { success: true, data: { reduction: 0.5, status: 'LEAN', swarmSize: this.currentSwarmSize } };
      default:
        return { success: false, error: 'Unknown action' };
    }
  }

  private async handleDeadline(params: Record<string, any>): Promise<ActionResult> {
     const { input, mission } = params;
     const deadline = this.parser.parse(input);
     this.currentUrgency = this.analyzer.analyze(deadline, 0.5);
     const agents = this.engine.determineSwarmSize(deadline.urgency);
     
     if (!this.budget.check(agents)) {
        return { success: false, error: 'BUDGET_EXCEEDED: Resource cap reached.' };
     }

     this.currentSwarmSize = agents;
     const shards = this.allocator.shard(mission || 'Global Task', agents);

     return {
        success: true,
        data: {
           swarmSize: agents,
           urgency: deadline.urgency,
           deadline: deadline.timestamp,
           shards
        }
     };
  }

  private async handleScaling(params: Record<string, any>): Promise<ActionResult> {
     const { urgencyLevel } = params;
     this.currentSwarmSize = this.engine.determineSwarmSize(urgencyLevel || 'low');
     return { success: true, data: { agentsAdded: this.currentSwarmSize, swarmSize: this.currentSwarmSize } };
  }
}

export const overclockPlugin = new OverclockPlugin();
