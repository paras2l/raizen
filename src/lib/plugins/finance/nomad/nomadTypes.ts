export interface ArbitrageNode {
  countryCode: string;
  interestRate: number;
  currency: string;
  liquidity: number; // 0-1
  riskScore: number; // 0-1
}

export interface TransferPath {
  id: string;
  nodes: string[];
  totalFee: number;
  estimatedTimeMs: number;
  reliability: number; // 0-1
}

export interface RiskProfile {
  region: string;
  politicalStability: number;
  currencyVolatility: number;
  regulatoryStrictness: number;
}

export interface NomadAction {
  type: 'scan-assets' | 'optimize-transfer' | 'evaluate-risk' | 'verify-compliance';
  payload: any;
}
