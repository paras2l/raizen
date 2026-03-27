export interface DigitalEntity {
  entityId: string;
  type: 'AI_AGENT' | 'TOOL' | 'INTERFACE';
  position: { x: number; y: number; z: number };
  scale: number;
  rotation: { x: number; y: number; z: number };
  status: 'ACTIVE' | 'IDLE' | 'HIDDEN';
}

export interface SpatialMap {
  mapId: string;
  points: number;
  bounds: { min: number[]; max: number[] };
  timestamp: number;
}

export interface InteractionEvent {
  interactionId: string;
  source: 'VOICE' | 'GESTURE' | 'GAZE' | 'SPATIAL';
  targetEntityId: string;
  payload: any;
}

export interface MetaSession {
  sessionId: string;
  convergenceLevel: number; // 0.0 to 1.0
  activeEntities: number;
}
