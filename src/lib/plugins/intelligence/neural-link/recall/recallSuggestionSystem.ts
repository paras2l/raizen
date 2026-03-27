import { MemoryMatch } from './memoryTypes';

export class RecallSuggestionSystem {
  public suggest(matches: MemoryMatch[]): string[] {
    return matches.map(m => {
        const type = m.entry.type.toLowerCase();
        const info = m.entry.metadata.title || m.entry.content.slice(0, 30);
        return `[RECALL] Found ${type}: "${info}" (${(m.score * 100).toFixed(0)}% match)`;
    });
  }
}
