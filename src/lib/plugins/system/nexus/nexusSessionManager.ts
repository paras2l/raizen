import { NexusNode, MeshState } from './nexusTypes';
import { nexusLogger } from './nexusLogger';

export class NexusSessionManager {
  private activeMesh: MeshState | null = null;
  private nodesOnline = 0;

  updateMeshState(state: MeshState) {
    this.activeMesh = state;
    this.nodesOnline = state.activeNodes;
    nexusLogger.log(`Nexus Mesh State Updated: ${state.activeNodes} nodes active.`);
  }

  getMeshHealth(): number {
    return this.activeMesh?.syncHealth || 0;
  }

  getNodesCount(): number {
    return this.nodesOnline;
  }
}
