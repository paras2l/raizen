import { FutureScenario, InferenceResult } from './types';

export class ProbabilityCalculator {
  calculate(scenarios: FutureScenario[]): { successProb: number; risks: string[] } {
    const successCount = scenarios.filter(s => s.outcomeScore > 0.3).length;
    const failureCount = scenarios.filter(s => s.outcomeScore < -0.3).length;
    
    return {
      successProb: successCount / scenarios.length,
      risks: failureCount > 1 ? ['High Volatility Pattern Detected', 'Potential Negative Market Impact'] : ['Low Confidence in Current Signals']
    };
  }
}
