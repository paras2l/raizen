import { EventEmitter } from 'events';

/**
 * Global Event Bus for Raizen S+++ Rank Singularity
 * Allows cross-protocol communication and reactive "neural" synapses.
 */
class RaizenEventBus extends EventEmitter {
  private static instance: RaizenEventBus;

  private constructor() {
    super();
    this.setMaxListeners(200); // Support 150+ features
  }

  static getInstance(): RaizenEventBus {
    if (!RaizenEventBus.instance) {
      RaizenEventBus.instance = new RaizenEventBus();
    }
    return RaizenEventBus.instance;
  }

  publish(eventId: string, data: any) {
    console.log(`[NEURAL] Event Published: ${eventId}`, data);
    this.emit(eventId, data);
  }

  subscribe(eventId: string, callback: (data: any) => void) {
    this.on(eventId, callback);
  }
}

export const eventBus = RaizenEventBus.getInstance();
