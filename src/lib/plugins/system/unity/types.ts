export type TrustLevel = 'unknown' | 'detected' | 'verified' | 'trusted_partner';

export interface PeerNode {
  id: string;
  name: string;
  publicKey: string;
  trustLevel: TrustLevel;
  lastSeen: string;
}

export interface SkillModule {
  id: string;
  name: string;
  category: string;
  scriptHash: string;
}

export interface HandshakePayload {
  nonce: string;
  timestamp: string;
  signature: string;
}

export interface UnityConfig {
  enableLocalDiscovery: boolean;
  autoHandshakeVerified: boolean;
  maxPeers: number;
}
