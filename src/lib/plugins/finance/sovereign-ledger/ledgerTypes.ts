export interface TaxScenario {
  id: string;
  description: string;
  totalIncome: number;
  calculatedTax: number;
  effectiveRate: number;
  jurisdictions: string[];
}

export interface ComplianceReport {
  id: string;
  type: 'audit-file' | 'legal-brief' | 'regulatory-disclosure';
  status: 'ready' | 'archived';
  timestamp: number;
}

export interface JurisdictionStatus {
  countryCode: string;
  taxRating: 'favorable' | 'moderate' | 'restrictive';
  regulatoryStability: number; // 0-1
  latestUpdate: number;
}

export interface LedgerAction {
  type: 'monitor-law' | 'optimize-tax' | 'generate-report' | 'dispatch-alert';
  payload: any;
}
