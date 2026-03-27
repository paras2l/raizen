import { ComputedSolution } from './types';

export class AlternativeManager {
  private alternatives: Map<string, ComputedSolution[]> = new Map();

  store(missionId: string, solutions: ComputedSolution[]) {
    this.alternatives.set(missionId, solutions);
  }

  getAlternatives(missionId: string, excludeId: string): ComputedSolution[] {
    return (this.alternatives.get(missionId) || []).filter(s => s.id !== excludeId);
  }
}
