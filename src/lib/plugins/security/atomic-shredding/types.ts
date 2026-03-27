export interface ShredTarget {
  id: string;
  path: string;
  size: number;
}

export interface OverwritePattern {
  pass: number;
  pattern: Uint8Array | 'random';
}

export interface SanitizationResult {
  success: boolean;
  passesCompleted: number;
  verificationScore: number; // 0.0 to 1.0 (entropy level)
}

export interface SectorMap {
  logicalBlocks: number[];
  slackSpaceSize: number;
}

export interface ShredConfig {
  defaultPasses: number;
  useCryptoRandom: boolean;
  verifyAfterShred: boolean;
}
