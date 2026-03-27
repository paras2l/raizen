export interface NexusNode {
  id: string;
  name: string;
  type: 'pc' | 'mobile' | 'iot' | 'cloud' | 'virtual';
  status: 'online' | 'offline' | 'syncing';
  lastSync: number;
}

export interface SyncPacket {
  id: string;
  sourceNodeId: string;
  targetNodeIds: string[];
  payload: any;
  timestamp: number;
}

export interface MeshState {
  activeNodes: number;
  syncHealth: number; // 0.0 - 1.0
  totalMemoryShared: number;
}

export interface NexusAction {
  type: 'discover' | 'sync' | 'mesh' | 'status';
  payload: any;
}
