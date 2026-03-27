import { nexusLogger } from './nexusLogger';
import { MeshNode, MeshNodeStatus } from './nexusTypes';
import { nexusConfig } from './nexusConfig';

export class GlobalMeshConnector {
  private connectedNodes: Map<string, MeshNode> = new Map();

  async establishMesh(): Promise<void> {
    nexusLogger.log('Initializing global mesh handshake sequence...');
    
    // Connect to seed nodes
    for (const seed of nexusConfig.seedNodes) {
      this.connectedNodes.set(seed.id, {
        ...seed,
        reputation: 1.0,
        lastSync: Date.now()
      } as MeshNode);
    }

    nexusLogger.mesh(`${this.connectedNodes.size} seed nodes synchronized across planetary mesh.`);
  }

  getNodes(): MeshNode[] {
    return Array.from(this.connectedNodes.values());
  }

  async addNode(node: MeshNode): Promise<boolean> {
    if (this.connectedNodes.size >= nexusConfig.maxPeers) {
      nexusLogger.error('Mesh saturation reached. Cannot add node.');
      return false;
    }

    this.connectedNodes.set(node.id, node);
    nexusLogger.mesh(`Node [${node.id}] in region [${node.region}] integrated into mesh.`);
    return true;
  }
}

export const globalMeshConnector = new GlobalMeshConnector();
