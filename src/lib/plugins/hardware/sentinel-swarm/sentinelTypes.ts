export interface SentinelUnit {
  id: string;
  type: 'DRONE' | 'MICRO_UNIT' | 'STATIONARY_NODE';
  position: { x: number; y: number; z: number };
  velocity: { vx: number; vy: number; vz: number };
  battery: number; // %
  status: 'ACTIVE' | 'IDLE' | 'CHARGING' | 'DAMAGED';
}

export interface ThreatVector {
  id: string;
  source: string;
  trajectory: { x: number; y: number; z: number }[];
  velocity: number;
  timeToCollision: number; // ms
  intensity: number; // 0.0 to 1.0
}

export interface KineticBarrier {
  id: string;
  active: boolean;
  density: number; // units per m^3
  coverageRadius: number; // meters
  formation: 'SHIELD' | 'PERIMETER' | 'INTERCEPT' | 'STALK';
}

export interface SentinelSession {
  id: string;
  active: boolean;
  startTime: number;
  threatsNeutralized: number;
  swarmHealth: number; // %
}
