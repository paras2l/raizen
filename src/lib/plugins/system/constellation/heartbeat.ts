export class DeviceHeartbeatMonitor {
  private heartbeats: Map<string, string> = new Map();

  recordHeartbeat(nodeId: string) {
    this.heartbeats.set(nodeId, new Date().toISOString());
    console.log(`[CONSTELLATION-HEARTBEAT] Recieved pulse from node: ${nodeId}`);
  }

  isNodeAlive(nodeId: string, timeoutMs: number): boolean {
    const last = this.heartbeats.get(nodeId);
    if (!last) return false;
    
    const diff = Date.now() - new Date(last).getTime();
    return diff < timeoutMs;
  }
}
