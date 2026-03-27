import { SynthesisGoal } from './types';

export class SkillPlanner {
  plan(request: string, existingSkills: string[]): SynthesisGoal | null {
    console.log('[SKILL-PLANNER] Checking for capability gaps in Raizen registry.');
    
    const lowerReq = request.toLowerCase();
    
    // Simple logic: if request mentions something Raizen can't do natively
    if (lowerReq.includes('extract') && lowerReq.includes('csv') && !existingSkills.includes('csv_exporter')) {
      return {
        id: `goal_${Date.now()}`,
        userRequest: request,
        requiredCapability: 'csv_exporter',
        status: 'pending'
      };
    }

    return null;
  }
}
