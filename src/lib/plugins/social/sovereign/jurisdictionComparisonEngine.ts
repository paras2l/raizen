import { JurisdictionComparison, TaxFramework } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class JurisdictionComparisonEngine {
  compare(primary: TaxFramework, secondary: TaxFramework): JurisdictionComparison {
    sovereignLogger.log(`Comparing ${primary.jurisdiction} vs ${secondary.jurisdiction} for fiscal efficiency...`);
    
    return {
      primary: primary.jurisdiction,
      secondary: secondary.jurisdiction,
      efficiencyDelta: Math.abs(primary.corporateRate - secondary.corporateRate),
      notablePros: [
        primary.corporateRate < secondary.corporateRate ? `${primary.jurisdiction} has lower corporate tax.` : `${secondary.jurisdiction} is more efficient.`,
        primary.digitalServiceTax ? "Exempt from DST." : "Subject to DST."
      ]
    };
  }
}
