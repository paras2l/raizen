export type DeviceType = 'vision-pro' | 'meta-quest' | 'xreal-air' | 'hololens' | 'generic-xr';
export type AnchorType = 'gaze' | 'world' | 'surface' | 'screen-relative';
export type OverlayType = 'info_panel' | 'notification' | 'nav_arrow' | '3d_marker' | 'data_widget';

export interface SpatialOverlay {
  id: string;
  type: OverlayType;
  title: string;
  content: string;
  anchor: AnchorType;
  position: { x: number; y: number; z: number };
  scale: number;
  metadata?: Record<string, any>;
}

export interface DeviceConnection {
  deviceId: string;
  type: DeviceType;
  status: 'connected' | 'disconnected' | 'pairing';
  lastSeen: string;
}

export interface HUDEvent {
  id: string;
  timestamp: string;
  action: 'show' | 'hide' | 'update' | 'pin';
  overlay: SpatialOverlay;
}

export interface SpatialConfig {
  wsPort: number;
  pairingToken: string;
  maxOverlays: number;
  defaultAnchor: AnchorType;
}

export interface SpatialLogEntry {
  timestamp: string;
  event: 'DEVICE_CONNECT' | 'OVERLAY_RENDER' | 'ANCHOR_LOCK' | 'DISCONNECT';
  details: string;
}
