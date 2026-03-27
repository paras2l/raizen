import { FutureScenario, FutureEvent } from './types';

export class ScenarioGenerator {
  generatePossibilities(count: number, horizon: number): FutureScenario[] {
    console.log(`[INFER-SCENARIO] Generating ${count} mission permutations for ${horizon}yr horizon.`);
    
    const scenarios: FutureScenario[] = [];
    for (let i = 0; i < 5; i++) { // Mocking 5 primary archetypes for the synthesis
      scenarios.push({
        id: `scen_${i}`,
        path: this.generatePath(horizon),
        outcomeScore: Math.random() * 2 - 1,
        probability: Math.random(),
        timeHorizonYears: horizon
      });
    }
    
    return scenarios;
  }

  private generatePath(years: number): string[] {
    const events: FutureEvent[] = ['market_crash', 'tech_breakthrough', 'personal_growth', 'external_disruption', 'success_milestone'];
    return Array.from({ length: 3 }, () => events[Math.floor(Math.random() * events.length)]);
  }
}
