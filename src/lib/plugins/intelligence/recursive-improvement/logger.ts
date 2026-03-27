import { ImprovementLogEntry } from './types';

export class ImprovementLogger {
  private logs: ImprovementLogEntry[] = [];

  log(entry: Omit<ImprovementLogEntry, 'timestamp'>) {
    const fullEntry: ImprovementLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[EVOLUTION] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const improvementLogger = new ImprovementLogger();
