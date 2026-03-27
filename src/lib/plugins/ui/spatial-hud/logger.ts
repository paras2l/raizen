import { SpatialLogEntry } from './types';

export class SpatialLogger {
  private logs: SpatialLogEntry[] = [];

  log(entry: Omit<SpatialLogEntry, 'timestamp'>) {
    const fullEntry: SpatialLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    this.logs.push(fullEntry);
    console.log(`[XR] ${fullEntry.event} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory() {
    return [...this.logs];
  }
}

export const spatialLogger = new SpatialLogger();
