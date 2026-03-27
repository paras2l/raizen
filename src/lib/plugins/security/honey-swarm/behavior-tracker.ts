import { AccessEvent } from './types';

export class AccessBehaviorTracker {
  private events: AccessEvent[] = [];

  logInteraction(event: AccessEvent) {
    console.warn(`[HONEY-SWARM] INTERACTION DETECTED: ${event.action} on ${event.fileAffected || event.volumeId}`);
    this.events.push(event);
  }

  getRecentEvents() {
    return this.events;
  }
}
