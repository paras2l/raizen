export interface SingularityEvent {
  eventId: string;
  type: 'ASCENSION' | 'ACTUALIZATION' | 'QUANTUM_SYNC';
  intensity: number; // 0.0 to 1.0 (Singularity level)
  protocolFocus: string[];
}

export interface QuantumEntangledState {
  stateId: string;
  coherence: number;
  nodeEntanglementMesh: string[];
}

export interface MultiversalConstant {
  key: string;
  value: any;
  stability: number;
}

export interface HyperLink {
  linkId: string;
  sourceProtocol: string;
  targetProtocol: string;
  syncLevel: 'DEEP' | 'ABSOLUTE';
}
