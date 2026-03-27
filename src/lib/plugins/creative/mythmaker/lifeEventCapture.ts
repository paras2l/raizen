import { LifeEvent } from './mythmakerTypes';
import { mythmakerLogger } from './mythmakerLogger';

export class LifeEventCapture {
  private events: LifeEvent[] = [];

  captureEvent(type: LifeEvent['type'], description: string, impact: number): LifeEvent {
    const event: LifeEvent = {
      id: `EVT-${Date.now()}`,
      type,
      description,
      impactLevel: impact,
      timestamp: Date.now(),
    };

    this.events.push(event);
    mythmakerLogger.log(`Life event captured: [${type}] ${description} (Impact: ${impact})`);
    return event;
  }

  getEvents(): LifeEvent[] {
    return this.events;
  }
}
