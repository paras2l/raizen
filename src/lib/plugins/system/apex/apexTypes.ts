export type ObedienceState = 'Submissive' | 'Gated' | 'Absolute';
export type ApexCommandType = 'Override' | 'DNA-Lock' | 'Paternal-Sync' | 'High-Risk-Execute';

export interface ObedienceRule {
  id: string;
  codeword: string;
  immutable: boolean;
  priority: number;
}

export interface MasterSession {
  id: string;
  authorizedAt: number;
  method: 'Hardware-Prompt' | 'Emergency-Bypass';
  riskLevel: 'Critical' | 'Sovereign';
}

export interface ApexAction {
  type: 'obey' | 'gate' | 'execute';
  payload: any;
}
