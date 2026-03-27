import { ExperienceEntry, RecallContext } from './memoryTypes';
import { MemoryRecallConfig } from './memoryConfig';
import { memoryLogger } from './memoryLogger';

export class ContextReconstructionModule {
  public async reconstruct(targetEntry: ExperienceEntry, allEntries: ExperienceEntry[]): Promise<RecallContext> {
    const windowStart = targetEntry.timestamp - MemoryRecallConfig.SEARCH.RECONSTRUCTION_WINDOW_MS;
    const windowEnd = targetEntry.timestamp + MemoryRecallConfig.SEARCH.RECONSTRUCTION_WINDOW_MS;
    
    const neighborhood = allEntries.filter(e => 
        e.timestamp >= windowStart && e.timestamp <= windowEnd && e.id !== targetEntry.id
    );

    await memoryLogger.reconstructed(`Entry: ${targetEntry.id}`);

    return {
      windowStart,
      windowEnd,
      relatedIds: neighborhood.map(e => e.id),
      semanticCluster: targetEntry.metadata.topic || 'General Context'
    };
  }
}
