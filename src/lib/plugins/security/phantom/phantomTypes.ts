export type FrequencyBand = 'FM' | 'AM' | 'VHF' | 'UHF' | 'SAT' | 'INDUCTION' | 'BIO' | 'GHOST';

export interface RadioFrequency {
  id: string;
  band: FrequencyBand;
  frequency: number; // in MHz for FM, kHz for AM, GHz for SAT
  noiseFloorDb: number;
}

export interface BroadcastPacket {
  id: string;
  frequencyId: string;
  content: string;
  signature: string;
  delivered: boolean;
  hopSequence?: number[];
}

export interface SignalState {
  activeTransmissions: number;
  encryptionStrength: 'LPI' | 'MIL' | 'GHOST' | 'QUANTUM';
  blackoutOptimization: boolean;
  meshSync: boolean;
}

export interface PhantomAction {
  type: 'scan' | 'broadcast' | 'encrypt' | 'status' | 'possess' | 'ghost';
  payload: any;
}
