export type NodeType = 'IoT' | 'Network' | 'Satellite' | 'Mobile';

export interface MeshNode {
  id: string;
  type: NodeType;
  location: { lat: number; lng: number };
  bandwidthMbps: number;
  latencyMs: number;
  trustScore: number;
}

export interface GridTunnel {
  id: string;
  nodes: string[];
  encryption: 'AES-GCM' | 'Quantum-Safe' | 'ChaCha20';
  status: 'Establishing' | 'Active' | 'Compromised' | 'Closed';
  establishedAt: number;
}

export interface ResilienceMetric {
  uptimePercent: number;
  anonymityLevel: number; // 0-1
  failoverCount: number;
}

export interface GridAction {
  type: 'scan' | 'tunnel' | 'optimize' | 'audit';
  payload: any;
}
