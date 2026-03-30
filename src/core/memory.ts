import { raizenMemory, MemoryEntry } from '../lib/memory';

export const Memory = {
  add: (text: string, metadata?: any) => raizenMemory.add(text, metadata),
  search: (query: string, limit?: number) => raizenMemory.search(query, limit),
  clear: () => raizenMemory.clear()
};

export type { MemoryEntry };
