import { SwarmLogEntry } from './types';

export class SwarmLogger {
  private logs: SwarmLogEntry[] = [];

  log(entry: Omit<SwarmLogEntry, 'timestamp'>) {
    const fullEntry: SwarmLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    
    this.logs.push(fullEntry);
    console.log(`[LEGION] ${fullEntry.event} ${fullEntry.agentId ? '| ' + fullEntry.agentId : ''} | ${fullEntry.details}`);
    
    if (this.logs.length > 1000) this.logs.shift();
  }

  getHistory(): SwarmLogEntry[] {
    return [...this.logs];
  }
}

export const swarmLogger = new SwarmLogger();
