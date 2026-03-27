import { BehaviorEntry, BehaviorSource } from './types';

export class BehaviorCollector {
  private buffer: BehaviorEntry[] = [];

  collect(source: BehaviorSource, context: string, content: string) {
    const entry: BehaviorEntry = {
      id: `beh_${Date.now()}`,
      source,
      timestamp: new Date().toISOString(),
      context,
      content
    };

    this.buffer.push(entry);
    console.log(`[TWIN-COLLECTOR] Captured behavioral signal from ${source}.`);
    
    if (this.buffer.length > 1000) this.buffer.shift();
  }

  getSamples(): BehaviorEntry[] {
    return [...this.buffer];
  }
}
