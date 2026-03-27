import { nomadLogger } from './nomadLogger';
import { nomadConfig } from './nomadConfig';
import { RiskProfile } from './nomadTypes';

export class RiskEvaluator {
  evaluateRegion(region: string): RiskProfile {
    nomadLogger.log(`Quantifying regional risk for ${region}...`);

    // Simulated Risk Evaluation
    const profile: RiskProfile = {
      region,
      politicalStability: 0.8 + Math.random() * 0.2,
      currencyVolatility: 0.05 + Math.random() * 0.1,
      regulatoryStrictness: 0.7 + Math.random() * 0.3
    };

    if (profile.politicalStability < nomadConfig.riskThresholds.political) {
      nomadLogger.error(`HIGH RISK detected in ${region}: Political stability below threshold.`);
    }

    return profile;
  }

  isSafe(profile: RiskProfile): boolean {
    return (
      profile.politicalStability >= nomadConfig.riskThresholds.political &&
      profile.currencyVolatility <= nomadConfig.riskThresholds.volatility
    );
  }
}

export const riskEvaluator = new RiskEvaluator();
