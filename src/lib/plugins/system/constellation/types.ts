export type NodeRole = 'PRIMARY_HUB' | 'SECONDARY_NODE' | 'TEMPORARY_HUB';
export type DeviceType = 'desktop' | 'laptop' | 'mobile' | 'tablet';

export interface RaizenNode {
  id: string;
  name: string;
  type: DeviceType;
  role: NodeRole;
  capabilities: DeviceCapability;
  lastSeen: string;
}

export interface DeviceCapability {
  cpuCores: number;
  ramTotalMB: number;
  batteryLevel?: number;
  networkReliability: number; // 0.0 to 1.0
}

export interface MigrationPackage {
  taskId: string;
  state: any;
  priority: number;
}

export interface ConstellationConfig {
  heartbeatIntervalMs: number;
  electionTimeoutMs: number;
  encryptionEnabled: boolean;
}
