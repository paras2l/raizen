export type DeviceStatus = 'DETECTED' | 'CONNECTING' | 'SEIZED' | 'DISCONNECTED' | 'ERR_AUTH';

export interface ControllableDevice {
  id: string;
  name: string;
  type: 'TV' | 'CAMERA' | 'DRONE' | 'LIGHT' | 'SENSOR' | 'NETWORK_EDGE' | 'OTHER';
  protocol: 'mDNS' | 'UPnP' | 'BLE' | 'OMNI_LINK';
  ip?: string;
  mac?: string;
  capabilities: string[];
  status: DeviceStatus;
  lastSeen: number;
}

export interface OrchestrationState {
  activeSession: string | null;
  seizedDevices: ControllableDevice[];
  lastScanTimestamp: number;
  scanRadius: number;
}

export interface ControlPanelSchema {
  deviceId: string;
  elements: Array<{
    id: string;
    type: 'BUTTON' | 'SLIDER' | 'FEED' | 'STATUS';
    label: string;
    action: string;
    value?: any;
  }>;
}
