import { GridTunnel, MeshNode } from './gridTypes';
import { gridLogger } from './gridLogger';

export class GridSessionManager {
  private activeTunnels: Map<string, GridTunnel> = new Map();
  private discoveredNodes: MeshNode[] = [];

  startSession() {
    gridLogger.log('Global mesh-point seizure session active.');
  }

  logNodes(nodes: MeshNode[]) {
    this.discoveredNodes = [...this.discoveredNodes, ...nodes];
    gridLogger.log(`Logged ${nodes.length} new global nodes. Total discovery: ${this.discoveredNodes.length}.`);
  }

  trackTunnel(tunnel: GridTunnel) {
    this.activeTunnels.set(tunnel.id, tunnel);
    gridLogger.log(`Tunnel ${tunnel.id} registered in session tracking.`);
  }

  getActiveTunnels(): GridTunnel[] {
    return Array.from(this.activeTunnels.values());
  }
}
