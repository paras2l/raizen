import { LegionWorker } from './worker';
import { AgentRole, SwarmConfig } from './types';

export class AgentSpawner {
  private activeAgents: Map<string, LegionWorker> = new Map();
  private config: SwarmConfig;

  constructor(config: SwarmConfig) {
    this.config = config;
  }

  spawn(role: AgentRole): LegionWorker | null {
    if (this.activeAgents.size >= this.config.maxAgents) {
      console.warn('[LEGION-SPAWNER] Swarm limit reached. Queueing agent.');
      return null;
    }

    const id = `agent_${Math.random().toString(36).substr(2, 9)}`;
    const agent = new LegionWorker(id, role);
    this.activeAgents.set(id, agent);
    
    return agent;
  }

  terminateAgent(id: string) {
    const agent = this.activeAgents.get(id);
    if (agent) {
      agent.terminate();
      this.activeAgents.delete(id);
    }
  }

  getActiveCount(): number {
    return this.activeAgents.size;
  }

  shutdownAll() {
    this.activeAgents.forEach((agent, id) => {
      agent.terminate();
    });
    this.activeAgents.clear();
  }
}
