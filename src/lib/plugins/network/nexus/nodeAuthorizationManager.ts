import { nexusLogger } from './nexusLogger';
import { MeshNode, NexusAuthToken } from './nexusTypes';
import { nexusConfig } from './nexusConfig';

export class NodeAuthorizationManager {
  async validateNode(node: MeshNode, token: NexusAuthToken): Promise<boolean> {
    nexusLogger.log(`Validating authorization for Node [${node.id}]...`);

    // Verify user-approved status (simulated)
    if (node.reputation < nexusConfig.shunThreshold) {
      nexusLogger.shun(node.id);
      return false;
    }

    if (token.expires < Date.now()) {
      nexusLogger.error(`Authorization token for Node [${node.id}] expired.`);
      return false;
    }

    nexusLogger.log(`Node [${node.id}] authorization verified.`);
    return true;
  }

  async shunNode(nodeId: string): Promise<void> {
    nexusLogger.shun(nodeId);
    // Logic to propagate shun list across mesh
  }
}

export const nodeAuthorizationManager = new NodeAuthorizationManager();
