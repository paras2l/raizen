import { TwinLogEntry } from './types';

export class TwinLogger {
  private logs: TwinLogEntry[] = [];

  log(entry: Omit<TwinLogEntry, 'timestamp'>) {
    const fullEntry: TwinLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[TWIN] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const twinLogger = new TwinLogger();
