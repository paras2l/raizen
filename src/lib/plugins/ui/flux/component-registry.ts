export class ComponentRegistry {
  private components = new Set(['editor', 'terminal', 'assistant', 'ledger', 'timeline']);

  getAvailable(): string[] {
    return Array.from(this.components);
  }

  isRegistered(id: string): boolean {
    return this.components.has(id);
  }
}
