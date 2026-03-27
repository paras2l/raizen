import { MicroEvent } from './types';

export class EventStreamMonitor {
  private events: MicroEvent[] = [];

  capture(event: Omit<MicroEvent, 'id' | 'timestamp'>) {
    const fullEvent: MicroEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };
    this.events.push(fullEvent);
    console.log(`[AEGIS-MONITOR] Captured micro-event: ${fullEvent.type}`);
    return fullEvent;
  }

  getRecent(): MicroEvent[] {
    return this.events.slice(-100);
  }
}
