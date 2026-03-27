import { SovereignEvent } from './sovereignTypes';
import { sovereignLogger } from './sovereignLogger';

export class SovereignSessionManager {
  private events: SovereignEvent[] = [];

  public async recordEvent(type: string, severity: number) {
    const event: SovereignEvent = {
        id: `EVT_${Date.now()}`,
        type,
        severity,
        resolved: false
    };
    
    this.events.push(event);
    await sovereignLogger.log('Tactical response initiated', { eventId: event.id, severity });
  }

  public resolveLastEvent() {
    const last = this.events.at(-1);
    if (last) last.resolved = true;
  }

  public getSovereignTimeline() {
    return [...this.events];
  }
}
