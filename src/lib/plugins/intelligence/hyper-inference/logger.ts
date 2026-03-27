import { InferenceLogEntry } from './types';

export class InferenceLogger {
  private logs: InferenceLogEntry[] = [];

  log(entry: Omit<InferenceLogEntry, 'timestamp'>) {
    const fullEntry: InferenceLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[FORESIGHT] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const inferenceLogger = new InferenceLogger();
