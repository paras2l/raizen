export interface TrackingSignal {
  id: string;
  type: 'fingerprint' | 'cookie' | 'id_leak' | 'beacons';
  source: string;
  detectedAt: string;
}

export interface FingerprintMask {
  userAgent: string;
  platform: string;
  screenResolution: string;
  hardwareConcurrency: number;
}

export interface SessionIdentity {
  id: string;
  startTime: string;
  expiryTime: string;
}

export interface PrivacyPreference {
  anonymityLevel: 'standard' | 'high' | 'total';
  blockThirdParty: boolean;
  neutralizeHeaders: boolean;
}

export interface MirageConfig {
  rotationIntervalMinutes: number;
  enableDynamicMasking: boolean;
  maskingIntensity: number; // 0.0 to 1.0
}
