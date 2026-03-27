import { ComputedSolution, ArbiterDecision, RiskLevel } from './types';

export class ArbiterEngine {
  private criticalActions = new Set(['delete', 'wipe', 'format', 'overwrite', 'deploy']);

  evaluate(solutions: ComputedSolution[], mission: string): ArbiterDecision {
    console.log(`[ORACLE-ARBITER] Executing Arbiter Logic on ${solutions.length} paths.`);
    
    const best = solutions.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
    
    // Detect Criticality
    const isCritical = this.criticalActions.has(mission.split(' ')[0].toLowerCase()) || best.isDestructive;
    const risk: RiskLevel = isCritical ? 'CRITICAL' : (best.confidence < 0.8 ? 'MEDIUM' : 'LOW');

    return {
      bestSolutionId: best.id,
      riskLevel: risk,
      requiresSignOff: isCritical,
      executionMode: isCritical ? 'PAUSED' : 'AUTO'
    };
  }
}
