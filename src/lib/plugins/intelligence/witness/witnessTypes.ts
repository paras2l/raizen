export interface HoloSnapshot {
  snapshotId: string;
  timestamp: number;
  spatialData: string; // Holographic mapping data
  audioStream: string;
  environmentalData: Record<string, any>;
}

export interface SensorPayload {
  biometrics: {
    heartRate: number;
    stressLevel: number;
    neuralLinkStatus: string;
  };
  telemetry: {
    geolocation: { lat: number; lng: number };
    velocity: number;
    deviceMeshStatus: string;
  };
}

export interface BlackBoxArchive {
  archiveId: string;
  startTime: number;
  endTime: number;
  snapshotCount: number;
  integrityHash: string;
}

export interface WitnessSession {
  sessionId: string;
  activeRecording: boolean;
  captureFidelity: '4K' | '8K' | 'MAX_HOLO';
}
