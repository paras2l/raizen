import { SoulLogEntry } from './types';

export class SoulLogger {
  private logs: SoulLogEntry[] = [];

  log(entry: Omit<SoulLogEntry, 'timestamp'>) {
    const fullEntry: SoulLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[SOUL] ${fullEntry.event} | Score: ${fullEntry.score || 'N/A'} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const soulLogger = new SoulLogger();
