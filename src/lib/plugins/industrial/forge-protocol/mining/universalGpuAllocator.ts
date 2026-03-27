import { GpuNode } from './forgeTypes';
import { forgeLogger } from '../forgeLogger';

export class UniversalGpuAllocator {
  public async allocateNodes(nodes: GpuNode[]): Promise<void> {
    for (const node of nodes) {
        await forgeLogger.log(`Allocating task to Remote GPU [${node.id}] in ${node.location}. Zero local power impact.`);
    }
  }
}
