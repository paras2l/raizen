export interface FakeIdentity {
  id: string;
  alias: string;
  backstory: string;
  crossPlatformLinked: boolean;
  activeStatus: 'idle' | 'propagating' | 'archived';
}

export interface DecoySignal {
  timestamp: string;
  sourceType: string;
  payloadSize: number;
  originNode: string;
}

export interface NoisePattern {
  frequency: number;
  burstMode: boolean;
  entropySource: string;
}

export interface ScrubJob {
  targetDomain: string;
  metadataPurged: boolean;
  status: 'pending' | 'completed' | 'failed';
}
