import { ResearchPaper, SimulationResult } from './catalystTypes';
import { catalystLogger } from './catalystLogger';

export class InnovationAdvisor {
  proposeChanges(research: ResearchPaper, sim: SimulationResult): string {
    catalystLogger.log(`Synthesizing innovation proposal for ${research.field}...`);
    
    if (sim.outcome === 'Stable') {
      return `Based on ${research.title}, I recommend scaling the molecular lattice by factor 1.2 for thermal resilience.`;
    }
    return `Simulation failed. We should pivot ${research.field} research toward high-entropy alloys instead.`;
  }
}
