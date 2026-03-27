import { ConceptSnapshot } from './eurekaTypes';
import { eurekaLogger } from './eurekaLogger';

export class ContextIndexingSystem {
  private index: Map<string, ConceptSnapshot> = new Map();

  public async indexConcept(snapshot: ConceptSnapshot): Promise<void> {
    this.index.set(snapshot.id, snapshot);
    await eurekaLogger.archive(snapshot.id, snapshot.topic || 'UNCATEGORIZED');
  }

  public async queryIdeas(project?: string): Promise<ConceptSnapshot[]> {
    const results = Array.from(this.index.values());
    if (project) {
        return results.filter(s => s.project === project);
    }
    return results;
  }
}
