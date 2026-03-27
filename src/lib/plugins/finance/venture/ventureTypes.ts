export interface ComputeNode {
  id: string;
  region: string;
  capacity: {
    cpu: number; // 0-1
    gpu: number; // 0-1
    ram: number; // 0-1
  };
  latencyMs: number;
  status: 'idle' | 'busy' | 'ephemeral';
}

export interface TaskSegment {
  id: string;
  payload: any;
  resourceRequired: 'CPU' | 'GPU' | 'RAM' | 'ALL';
  assignedNodeId?: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
}

export interface ResourceMetrics {
  localLoad: number;
  overflowDetected: boolean;
  activeRemoteNodes: number;
  bandwidthUsage: number;
}

export interface VentureAction {
  type: 'detect-load' | 'allocate-task' | 'establish-link' | 'integrate-result';
  payload: any;
}
