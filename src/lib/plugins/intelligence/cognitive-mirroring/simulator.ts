import { StyleProfile, DecisionPattern } from './types';

export class ActionSimulator {
  simulate(task: string, style: StyleProfile, decisions: DecisionPattern): string {
    console.log(`[TWIN-SIMULATOR] Mirroring user style for task: ${task}`);
    
    // Simulates generating a response in the user's technical/concise style
    if (style.tone === 'technical' && style.verbosity < 0.5) {
      return `[MIRROR] ${task} completed. Opt: Speed. Logic: Minimalist. Style: direct/tech.`;
    }

    return `[MIRROR] Standard replication of ${task} applied.`;
  }
}
