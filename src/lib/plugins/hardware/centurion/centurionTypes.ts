export type DeviceType = 'Vehicle' | 'Drone' | 'Yacht' | 'Machinery' | 'SmartAsset';

export interface ControllableDevice {
  id: string;
  name: string;
  type: DeviceType;
  connectionType: 'Network' | 'Satellite' | 'Local';
  status: 'Dormant' | 'Active' | 'Locked' | 'Compromised';
  capabilities: string[];
}

export interface ControlCommand {
  deviceId: string;
  action: string;
  params: Record<string, any>;
  priority: number;
  expiresAt: number;
}

export interface AuthorizationToken {
  id: string;
  issuedAt: number;
  userId: string;
  scope: string[];
}

export interface CenturionAction {
  type: 'scan' | 'control' | 'authorize' | 'schedule';
  payload: any;
}
