import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { gridLogger } from './gridLogger';
import { GlobalNodeScanner } from './globalNodeScanner';
import { MeshLinkManager } from './meshLinkManager';
import { DataTunnelController } from './dataTunnelController';
import { ResilienceOptimizer } from './resilienceOptimizer';
import { GridSessionManager } from './gridSessionManager';
import { GridTunnel } from './gridTypes';

export class GridProtocolService implements RaizenPlugin {
  id = 'network.grid';
  name = 'Grid Protocol';
  description = 'Global Mesh-Point Seizure & Unblockable Digital Tunneling';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'grid-scan',
      label: 'Scan Global Nodes',
      description: 'Detect reachable IoT and network nodes globally suitable for mesh-point seizure',
      category: 'security',
      sensitive: false,
    },
    {
      id: 'grid-establish-tunnel',
      label: 'Establish Global Tunnel',
      description: 'Create an unblockable, encrypted tunnel through the global mesh',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'grid-optimize',
      label: 'Optimize Mesh Resilience',
      description: 'Rotate and optimize routing paths for maximum stealth and uptime',
      category: 'security',
      sensitive: true,
    }

  ];

  private scanner = new GlobalNodeScanner();
  private mesh = new MeshLinkManager();
  private controller = new DataTunnelController();
  private optimizer = new ResilienceOptimizer();
  private sessions = new GridSessionManager();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    gridLogger.log('Grid Protocol Initializing [PLANETARY MESH SEIZURE ACTIVE]');
    this.status = 'online';
    this.sessions.startSession();
    gridLogger.success('Grid global tunneling layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'grid-scan':
          const nodes = await this.scanner.scanNodes();
          this.sessions.logNodes(nodes);
          return { success: true, data: { nodes, nodeCount: nodes.length } };

        case 'grid-establish-tunnel':
          const targetNodes = params.nodes || (await this.scanner.scanNodes()).slice(0, 3);
          const tunnel = await this.mesh.establishLinks(targetNodes);
          this.sessions.trackTunnel(tunnel);
          return { success: true, data: { tunnel } };

        case 'grid-optimize':
          const activeTunnels = this.sessions.getActiveTunnels();
          if (activeTunnels.length === 0) return { success: false, error: 'No active tunnels to optimize.' };
          
          const metrics = await Promise.all(activeTunnels.map(t => this.optimizer.optimizeRouting(t)));
          return { success: true, data: { optimizationMetrics: metrics } };

        default:
          gridLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      gridLogger.error(`Mesh seizure failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    gridLogger.log('Grid Protocol offline [TUNNELS PURGED].');
  }
}

export const gridProtocol = new GridProtocolService();
