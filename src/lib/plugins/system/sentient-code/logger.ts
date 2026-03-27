import { OptimizationLogEntry } from './types';

export class SentientLogger {
  private logs: OptimizationLogEntry[] = [];

  log(entry: Omit<OptimizationLogEntry, 'timestamp'>) {
    const fullEntry: OptimizationLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[METABOLISM] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const sentientLogger = new SentientLogger();
