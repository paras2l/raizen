import { MemoryEntry } from './types';

export class VectorMemoryStore {
  private store: Map<string, MemoryEntry> = new Map();

  async save(entry: MemoryEntry) {
    this.store.set(entry.id, entry);
    // console.log(`[VECTOR-STORE] Persisted semantic vector for: ${entry.id}`);
  }

  async search(queryEmbedding: number[], limit = 5): Promise<MemoryEntry[]> {
    // Simulates cosine similarity search
    const results = Array.from(this.store.values()).slice(0, limit);
    return results;
  }

  async delete(id: string) {
    this.store.delete(id);
  }

  clearAll() {
    this.store.clear();
  }

  get totalCount(): number {
    return this.store.size;
  }
}
