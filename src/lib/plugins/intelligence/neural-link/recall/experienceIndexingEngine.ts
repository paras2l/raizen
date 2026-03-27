import { ExperienceEntry } from './memoryTypes';
import { memoryLogger } from './memoryLogger';

export class ExperienceIndexingEngine {
  private index: ExperienceEntry[] = [];

  public async indexActivity(type: ExperienceEntry['type'], content: string, metadata: any) {
    const entry: ExperienceEntry = {
      id: `EXP_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type,
      content,
      metadata,
      timestamp: Date.now()
    };
    
    this.index.push(entry);
    if (this.index.length > 1000) this.index.shift();
    
    await memoryLogger.log('Experience indexed', { id: entry.id, type });
    return entry;
  }

  public getIndex() {
    return [...this.index];
  }
}
