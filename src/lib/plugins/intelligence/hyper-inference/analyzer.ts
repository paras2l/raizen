import { DecisionCategory, DecisionVariable } from './types';

export class DecisionAnalyzer {
  analyze(query: string): { category: DecisionCategory; variables: DecisionVariable[]; horizon: number } {
    console.log(`[INFER-ANALYZER] Parsing mission query: "${query}"`);
    
    // Simulates NLP parsing of the user's strategic question
    const q = query.toLowerCase();
    let category: DecisionCategory = 'personal';
    const variables: DecisionVariable[] = [];
    let horizon = 10;

    if (q.includes('startup') || q.includes('business') || q.includes('invest')) {
      category = 'financial';
      variables.push({ name: 'market_growth', type: 'numeric', currentValue: 0.05, volatility: 0.8 });
      variables.push({ name: 'funding_available', type: 'boolean', currentValue: false, volatility: 0.6 });
      horizon = 5;
    } else if (q.includes('career') || q.includes('research') || q.includes('academic')) {
      category = 'career';
      variables.push({ name: 'skill_acquisition_rate', type: 'numeric', currentValue: 0.1, volatility: 0.3 });
      variables.push({ name: 'job_stability', type: 'numeric', currentValue: 0.8, volatility: 0.2 });
      horizon = 20;
    }

    return { category, variables, horizon };
  }
}
