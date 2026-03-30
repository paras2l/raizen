import { pluginRegistry } from '../lib/plugins';

export const Swarm = {
  async executeMitosis(count: number, task: string = 'CORE_SWARM_ORCHESTRATION') {
    return await pluginRegistry.executeAction('legion-swarm', 'swarm-mitosis', { count, task });
  },
  
  async getStatus() {
    return await pluginRegistry.executeAction('legion-swarm', 'get-swarm-status', {});
  }
};
