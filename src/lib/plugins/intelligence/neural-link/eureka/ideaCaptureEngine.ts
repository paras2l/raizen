import { ConceptSnapshot, WorkspaceState } from './eurekaTypes';
import { eurekaLogger } from './eurekaLogger';

export class IdeaCaptureEngine {
  public async createSnapshot(state: WorkspaceState, intent: string): Promise<ConceptSnapshot> {
    const snapshot: ConceptSnapshot = {
      id: `IDEA_${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
      timestamp: Date.now(),
      state,
      intent
    };

    await eurekaLogger.log('Concept snapshot created', { snapshotId: snapshot.id });
    return snapshot;
  }
}
