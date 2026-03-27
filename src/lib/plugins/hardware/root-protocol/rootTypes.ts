export interface OverrideDevice {
  id: string;
  name: string;
  vendor: string;
  model: string;
  firmwareVersion: string;
  status: 'LOCKED' | 'OVERRIDDEN' | 'BRICKED' | 'DISCONNECTED';
  capabilities: string[];
}

export interface FirmwareStatus {
  deviceId: string;
  originalVersion: string;
  overrideVersion: string;
  appliedAt: number;
}

export interface RootSession {
  id: string;
  deviceId: string;
  mode: 'PASSIVE' | 'ACTIVE_CONTROL' | 'RAW_SUBSYSTEM';
  startTime: number;
}

export interface CapabilityMatrix {
  basic: string[];
  hidden: string[];
  unlocked: string[];
}
