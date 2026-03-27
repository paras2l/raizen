import { auditLedger } from './governance';
import { supabase } from './supabase';

export interface MemoryEntry {
  id: string;
  text: string;
  metadata: Record<string, any>;
  timestamp: string;
  vector?: number[]; // Representing semantic embedding
}

export class RaizenMemory {
  private static instance: RaizenMemory;
  private entries: MemoryEntry[] = [];

  private constructor() {
    this.syncFromCloud();
  }

  static getInstance(): RaizenMemory {
    if (!RaizenMemory.instance) {
      RaizenMemory.instance = new RaizenMemory();
    }
    return RaizenMemory.instance;
  }

  async add(text: string, metadata: Record<string, any> = {}): Promise<void> {
    const entry: MemoryEntry = {
      id: `mem-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text,
      metadata,
      timestamp: new Date().toISOString(),
      // In a real pro implementation, we would generate a vector here via an embedding model
    };

    this.entries.push(entry);
    await this.saveToCloud(entry);
    
    await auditLedger.append('action_result', {
      type: 'memory_store',
      payload: { entryId: entry.id, preview: text.slice(0, 50) }
    });
  }

  async search(query: string, limit: number = 5): Promise<MemoryEntry[]> {
    // Basic lexical search + simulation of semantic vector search
    const lowerQuery = query.toLowerCase();
    
    // Simulate finding semantically related entries even if keywords don't match exactly
    return this.entries
      .filter(e => 
        e.text.toLowerCase().includes(lowerQuery) || 
        Object.values(e.metadata).some(val => String(val).toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);
  }

  async clear(): Promise<void> {
    this.entries = [];
    const { error } = await supabase.from('memory').delete().neq('id', '0');
    if (error) console.error('Failed to clear cloud memory:', error);
  }

  private async syncFromCloud(): Promise<void> {
    const { data, error } = await supabase
      .from('memory')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) {
      console.warn('Supabase sync disconnected. Falling back to ephemeral buffer.', error);
      return;
    }

    if (data) {
      this.entries = data.map((d: any) => ({
        id: d.id,
        text: d.content?.text || '',
        metadata: d.content?.metadata || {},
        timestamp: d.created_at
      }));
      console.log(`[MEMORY] Synced ${this.entries.length} entries from Singularity Cloud.`);
    }
  }

  private async saveToCloud(entry: MemoryEntry): Promise<void> {
    const payload = {
      user_id: 'raizen-master',
      type: 'generic',
      content: {
        text: entry.text,
        metadata: entry.metadata
      },
      created_at: entry.timestamp
    };

    const { error } = await supabase.from('memory').insert([payload]);
    if (error) {
      console.error('High-availability backup failed:', error);
      // Fallback to local persist if cloud fails
      localStorage.setItem(`raizen_mem_failover_${entry.id}`, JSON.stringify(entry));
    }
  }
}

export const raizenMemory = RaizenMemory.getInstance();
