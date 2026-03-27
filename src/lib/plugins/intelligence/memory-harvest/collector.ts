import { MemoryEntry, MemorySource } from './types';

export class MemoryCollector {
  async collect(source: MemorySource, content: string, context: Record<string, any> = {}): Promise<MemoryEntry> {
    const id = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    const entry: MemoryEntry = {
      id,
      timestamp: new Date().toISOString(),
      source,
      content,
      context
    };

    console.log(`[MEMORY-COLLECTOR] Captured memory from ${source}: ${id}`);
    
    // In a real implementation, this would trigger a background sync to the vector store
    return entry;
  }

  async bulkCollect(source: MemorySource, items: string[]): Promise<MemoryEntry[]> {
    return Promise.all(items.map(item => this.collect(source, item)));
  }
}
