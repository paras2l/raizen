export type TrustJurisdiction = 'Cayman' | 'Singapore' | 'Switzerland' | 'Nevada' | 'Global-Sovereign';

export interface TrustStructure {
  id: string;
  name: string;
  jurisdiction: TrustJurisdiction;
  type: 'Family-Trust' | 'Asset-LLC' | 'Sovereign-Entity';
  status: 'active' | 'pending' | 'shielded';
  metadata: Record<string, any>;
}

export interface WalletState {
  id: string;
  address: string;
  assets: { symbol: string; amount: number }[];
  lastAudit: number;
}

export interface ComplianceProfile {
  jurisdiction: string;
  privacyTier: number; // 0-5
  reportingRequirement: 'None' | 'Minimal' | 'standard';
}

export interface MintAction {
  type: 'build-trust' | 'manage-wallet' | 'check-tax' | 'automate-tx';
  payload: any;
}
