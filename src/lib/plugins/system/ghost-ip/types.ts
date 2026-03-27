export type RoutingMode = 'direct' | 'vpn' | 'proxy' | 'tor';

export interface RelayNode {
  id: string;
  name: string;
  location: string;
  latencyMs: number;
  trustScore: number;
}

export interface NetworkPath {
  hops: RelayNode[];
  exitNode: RelayNode;
}

export interface MaskingStatus {
  ipMasked: boolean;
  dnsMasked: boolean;
  webrtcBlocked: boolean;
}

export interface GhostConfig {
  defaultMode: RoutingMode;
  autoRotateIntervalMs: number;
  strictLeakPrevention: boolean;
}
