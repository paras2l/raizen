import { BridgeLogEntry } from './types';

export class BridgeLogger {
  private logs: BridgeLogEntry[] = [];

  log(entry: Omit<BridgeLogEntry, 'timestamp'>) {
    const fullEntry: BridgeLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    
    this.logs.push(fullEntry);
    
    // Console log for debug (masked token)
    console.log(`[BRIDGE] ${fullEntry.mode} → ${fullEntry.entity_id} → ${fullEntry.action} | ${fullEntry.result.toUpperCase()}`);
    
    if (this.logs.length > 500) this.logs.shift(); // Basic memory capped buffer
  }

  getHistory(): BridgeLogEntry[] {
    return [...this.logs];
  }

  // Safety first: never expose tokens
  sanitize(msg: string): string {
    return msg.replace(/Bearer [a-zA-Z0-9._-]+/g, 'Bearer [REDACTED]');
  }
}

export const bridgeLogger = new BridgeLogger();
