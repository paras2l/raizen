import { InferenceResult, FutureScenario } from './types';

export class OutcomeAggregator {
  aggregate(decisionId: string, scenarios: FutureScenario[], stats: { successProb: number; risks: string[] }, simCount: number): InferenceResult {
    const avgScore = scenarios.reduce((sum, s) => sum + s.outcomeScore, 0) / scenarios.length;
    
    return {
      decisionId,
      summary: avgScore > 0 
        ? "Strategic Analysis suggests a positive outcome path with manageable risks." 
        : "Evaluation indicates significant systemic risks. Caution advised for long-term commitment.",
      bestPathConfidence: 0.72,
      successProbability: stats.successProb,
      topRisks: stats.risks,
      simulatedScenarios: simCount
    };
  }
}
