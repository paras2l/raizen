import { NetworkingGoal } from './navigatorTypes';
import { navigatorLogger } from './navigatorLogger';

export class GoalDefinitionEngine {
  createGoal(desc: string, industry: string): NetworkingGoal {
    navigatorLogger.log(`Defining path for goal: ${desc} in ${industry}...`);
    
    return {
      id: 'goal-' + Date.now(),
      description: desc,
      targetIndustry: industry,
      deadline: new Date(Date.now() + 15552000000).toISOString(), // 6 months
      priority: 1
    };
  }
}
