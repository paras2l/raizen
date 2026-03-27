export type CosmicEventType = 'Solar Flare' | 'Geomagnetic Storm' | 'Proton Flux' | 'EMP';

export interface CosmicActivity {
  id: string;
  type: CosmicEventType;
  intensity: number; // 1-10 scale
  expectedImpactTime: number; // timestamp
  coordinates: { azimuth: number; elevation: number };
}

export interface MeshState {
  nodeId: string;
  status: 'active' | 'hardened' | 'rerouted' | 'latent';
  protectionLevel: number;
}

export interface NervanaMitigation {
  timestamp: number;
  event: CosmicActivity;
  actionsTaken: string[];
  systemStabilityLevel: number;
}

export interface NervanaAction {
  type: 'track' | 'analyze' | 'harden' | 'status';
  payload: any;
}
