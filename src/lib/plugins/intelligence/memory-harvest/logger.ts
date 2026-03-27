import { MemoryLogEntry } from './types';

export class MemoryLogger {
  private logs: MemoryLogEntry[] = [];

  log(entry: Omit<MemoryLogEntry, 'timestamp'>) {
    const fullEntry: MemoryLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[MEMORY] ${fullEntry.event} | ${fullEntry.source} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const memoryLogger = new MemoryLogger();
