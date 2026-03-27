export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface LegalDraft {
  id: string;
  title: string;
  jurisdiction: string;
  content: string;
  version: string;
  status: 'draft' | 'reviewed' | 'finalized';
}

export interface RiskFlag {
  id: string;
  type: 'hidden-trap' | 'ambiguous-clause' | 'exploitative-term';
  clause: string;
  description: string;
  riskLevel: RiskLevel;
  suggestedEdit?: string;
}

export interface OutcomeSimulation {
  scenarioId: string;
  disputeProbability: number; // 0-1
  favoredParty: 'User' | 'Counterparty' | 'Neutral';
  likelyResolution: string;
}

export interface LexAction {
  type: 'scan-contract' | 'analyze-risk' | 'simulate-outcome' | 'generate-draft';
  payload: any;
}
