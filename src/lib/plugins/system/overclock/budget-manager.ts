import { ResourceBudget } from './types';

export class ResourceBudgetManager {
  check(requestedAgents: number): boolean {
    const max = 30;
    if (requestedAgents > max) {
      console.log(`[OVERCLOCK-BUDGET] Requested ${requestedAgents} agents exceeds safety cap of ${max}. Throttling.`);
      return false;
    }
    return true;
  }

  getBudget(): ResourceBudget {
    return {
      maxAgents: 30,
      cpuLimit: 0.9,
      ramLimitMB: 8192,
      costCap: 1.0 // $1.00 per hour
    };
  }
}
