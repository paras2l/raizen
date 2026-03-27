import { ContextLogEntry } from './types';

export class ContextLogger {
  private logs: ContextLogEntry[] = [];

  log(entry: Omit<ContextLogEntry, 'timestamp'>) {
    const fullEntry: ContextLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[CONTEXT] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const contextLogger = new ContextLogger();
