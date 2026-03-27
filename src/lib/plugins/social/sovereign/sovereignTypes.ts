export interface TaxFramework {
  jurisdiction: string;
  corporateRate: number;
  personalRate: number;
  digitalServiceTax: boolean;
  reportingStandard: 'CRS' | 'FATCA' | 'Both' | 'None';
}

export interface JurisdictionComparison {
  primary: string;
  secondary: string;
  efficiencyDelta: number; // Percentage improvement
  notablePros: string[];
}

export interface CorporateStructure {
  id: string;
  type: 'LLC' | 'Holding' | 'Trust' | 'Foundation';
  jurisdiction: string;
  purpose: string;
  privacyLevel: 'high' | 'medium' | 'low';
}

export interface EfficiencyPlan {
  currentEffectiveRate: number;
  projectedEffectiveRate: number;
  recommendedSteps: string[];
}
