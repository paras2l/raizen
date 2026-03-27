import { KnowledgeSource, RawKnowledge } from './retriever';

export interface ContextAdapter {
  id: KnowledgeSource;
  fetch(query: string): Promise<RawKnowledge[]>;
}

export class SourceAdapters {
  private adapters: Map<KnowledgeSource, ContextAdapter> = new Map();

  register(adapter: ContextAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  get(id: KnowledgeSource): ContextAdapter | undefined {
    return this.adapters.get(id);
  }

  getEnabled(ids: KnowledgeSource[]): ContextAdapter[] {
    return Array.from(this.adapters.values()).filter(a => ids.includes(a.id));
  }
}
