import { ExperienceEntry, MemoryMatch } from './memoryTypes';
import { MemoryRecallConfig } from './memoryConfig';

export class MemorySearchEngine {
  public search(query: string, index: ExperienceEntry[]): MemoryMatch[] {
    const lowerQuery = query.toLowerCase();
    
    return index
      .map(entry => {
        let score = 0;
        if (entry.content.toLowerCase().includes(lowerQuery)) score += 0.5;
        if (entry.metadata.topic?.toLowerCase().includes(lowerQuery)) score += 0.3;
        
        return {
          id: entry.id,
          score,
          entry,
          reason: score > 0.5 ? 'Direct keyword match' : 'Contextual association'
        };
      })
      .filter(match => match.score > MemoryRecallConfig.SEARCH.FUZZY_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, MemoryRecallConfig.SEARCH.MAX_MATCHES);
  }
}
