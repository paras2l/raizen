import { MemoryMatch } from './memoryTypes';
import { memoryLogger } from './memoryLogger';

export class MemorySessionManager {
  private recallHistory: any[] = [];

  public async recordRecall(query: string, matches: MemoryMatch[]) {
    this.recallHistory.push({
      query,
      matchCount: matches.length,
      timestamp: Date.now()
    });
    
    await memoryLogger.log('Memory recall request detected', { query, matches: matches.length });
  }

  public getRecallStats() {
    return {
      totalRecalls: this.recallHistory.length,
      lastRecall: this.recallHistory.at(-1)?.timestamp,
      avgMatchCount: this.recallHistory.reduce((a, b) => a + b.matchCount, 0) / (this.recallHistory.length || 1)
    };
  }
}
