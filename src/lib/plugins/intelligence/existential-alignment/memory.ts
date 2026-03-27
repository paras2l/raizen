export interface SoulMemoryEntry {
  id: string;
  timestamp: string;
  situation: string;
  decision: string;
  alignmentScore: number;
}

export class SoulMemory {
  private history: SoulMemoryEntry[] = [];

  recordDecision(situation: string, decision: string, score: number) {
    const entry: SoulMemoryEntry = {
      id: `soul_${Date.now()}`,
      timestamp: new Date().toISOString(),
      situation,
      decision,
      alignmentScore: score
    };
    this.history.push(entry);
    
    if (this.history.length > 500) this.history.shift();
  }

  getHistory(): SoulMemoryEntry[] {
    return [...this.history];
  }

  clear() {
    this.history = [];
  }
}
