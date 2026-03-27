import { PredictiveLogEntry } from './types';

export class PredictiveLogger {
  private logs: PredictiveLogEntry[] = [];

  log(entry: Omit<PredictiveLogEntry, 'timestamp'>) {
    const fullEntry: PredictiveLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[ORACLE] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const predictiveLogger = new PredictiveLogger();
