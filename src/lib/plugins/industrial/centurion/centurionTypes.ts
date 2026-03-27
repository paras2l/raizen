export type AssetState = 'Dormant' | 'Active' | 'Hijacked' | 'Locked';
export type ConnectionProtocol = 'Network' | 'Bluetooth' | 'Serial' | 'Mesh';

export interface PhysicalAsset {
  id: string;
  type: 'Vehicle' | 'Sensor' | 'Device' | 'Industrial';
  protocol: ConnectionProtocol;
  state: AssetState;
  powerLevel: number; // 0 to 100
}

export interface HijackSession {
  id: string;
  assetId: string;
  startTime: number;
  isFullPower: boolean;
}

export interface CenturionAction {
  type: 'connect' | 'hijack' | 'command' | 'release';
  payload: any;
}
