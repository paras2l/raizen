import { lexLogger } from './lexLogger';
import { lexConfig } from './lexConfig';
import { RiskFlag } from './lexTypes';

export class RiskAnalyzer {
  quantifyRisk(flags: RiskFlag[]): number {
    lexLogger.log(`Quantifying financial and legal risk for ${flags.length} flagged segments...`);

    const averageRisk = flags.reduce((acc, f) => {
      const value = f.riskLevel === 'Critical' ? 1.0 : f.riskLevel === 'High' ? 0.75 : f.riskLevel === 'Medium' ? 0.45 : 0.15;
      return acc + value;
    }, 0) / flags.length;

    if (averageRisk >= lexConfig.riskThresholds.high) {
      lexLogger.risk('Composite-Contract-Risk', 'High');
    }

    return averageRisk;
  }
}

export const riskAnalyzer = new RiskAnalyzer();
