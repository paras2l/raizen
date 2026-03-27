import { NavigationRoute, UrbanEvent } from './citadelTypes';
import { CitadelConfig } from './citadelConfig';
import { citadelLogger } from './citadelLogger';

export class SafePathOptimizer {
  public optimize(routes: NavigationRoute[], activeRisks: UrbanEvent[]): NavigationRoute {
    citadelLogger.log(`Optimizing across ${routes.length} potential routes for maximum safety...`);
    
    // Prioritize routes with highest safety index
    const sorted = routes.sort((a, b) => b.safetyIndex - a.safetyIndex);
    
    const best = sorted[0];
    citadelLogger.log(`Optimal safe-path selected: ${best.id} [Safety: ${best.safetyIndex * 100}%]`);
    return best;
  }
}
