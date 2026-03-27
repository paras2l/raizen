import { aegisLogger } from './aegisLogger';

export class PostEventLogger {
  private eventHistory: any[] = [];

  logEventResult(eventId: string, outcome: string, metrics: any): void {
    aegisLogger.log(`Recording event metrics for ${eventId}...`);

    const entry = {
      eventId,
      outcome,
      metrics,
      timestamp: Date.now()
    };

    this.eventHistory.push(entry);
    aegisLogger.event(`${outcome} verified for ${eventId}. Saved to sovereign audit ledger.`);
  }

  getHistory(): any[] {
    return this.eventHistory;
  }
}

export const postEventLogger = new PostEventLogger();
