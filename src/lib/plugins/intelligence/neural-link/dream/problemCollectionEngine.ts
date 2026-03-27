import { UnresolvedProblem } from './dreamTypes';
import { dreamLogger } from './dreamLogger';

export class ProblemCollectionEngine {
  private vault: UnresolvedProblem[] = [];

  public async collect(problem: Omit<UnresolvedProblem, 'id' | 'timestamp'>) {
    const newProblem: UnresolvedProblem = {
      ...problem,
      id: `PROB_${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      timestamp: Date.now()
    };
    this.vault.push(newProblem);
    await dreamLogger.log('Unresolved problem collected for incubation', { id: newProblem.id, topic: newProblem.topic });
  }

  public getPendingProblems(): UnresolvedProblem[] {
    return this.vault;
  }

  public clearVault() {
    this.vault = [];
  }
}
