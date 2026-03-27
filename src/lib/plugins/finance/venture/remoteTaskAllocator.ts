import { ventureLogger } from './ventureLogger';
import { ventureConfig } from './ventureConfig';
import { ComputeNode, TaskSegment } from './ventureTypes';

export class RemoteTaskAllocator {
  private availableNodes: ComputeNode[] = [];

  constructor() {
    this.refreshNodePool();
  }

  allocate(task: TaskSegment): ComputeNode | null {
    ventureLogger.log(`Allocating task segment ${task.id} (${task.resourceRequired})...`);

    const targetNode = this.availableNodes.find(n => 
      n.status === 'idle' && 
      n.capacity[task.resourceRequired.toLowerCase() as keyof ComputeNode['capacity']] > 0.7
    );

    if (targetNode) {
      targetNode.status = 'busy';
      ventureLogger.allocation(targetNode.id, targetNode.region);
      return targetNode;
    }

    ventureLogger.error('Critical: No suitable global compute nodes available.');
    return null;
  }

  private refreshNodePool(): void {
    // Generate simulated global compute nodes
    this.availableNodes = Array.from({ length: 15 }).map((_, i) => ({
      id: `node-${Math.random().toString(36).substr(2, 9)}`,
      region: ventureConfig.globalRegions[i % ventureConfig.globalRegions.length],
      capacity: { cpu: 0.9, gpu: 0.95, ram: 0.85 },
      latencyMs: 15 + Math.random() * 50,
      status: 'idle'
    }));
  }

  getActiveNodeCount(): number {
    return this.availableNodes.filter(n => n.status === 'busy').length;
  }
}

export const remoteTaskAllocator = new RemoteTaskAllocator();
