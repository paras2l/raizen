/**
 * Global Event Bus for Raizen S+++ Rank Singularity
 * Browser-compatible implementation (no Node.js 'events' dependency).
 * Allows cross-protocol communication and reactive "neural" synapses.
 */
class RaizenEventBus {
  private static instance: RaizenEventBus;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  private constructor() {}

  static getInstance(): RaizenEventBus {
    if (!RaizenEventBus.instance) {
      RaizenEventBus.instance = new RaizenEventBus();
    }
    return RaizenEventBus.instance;
  }

  publish(eventId: string, data: any) {
    console.log(`[NEURAL] Event Published: ${eventId}`, data);
    const cbs = this.listeners.get(eventId);
    if (cbs) cbs.forEach(cb => cb(data));
  }

  subscribe(eventId: string, callback: (data: any) => void) {
    if (!this.listeners.has(eventId)) {
      this.listeners.set(eventId, new Set());
    }
    this.listeners.get(eventId)!.add(callback);
  }

  unsubscribe(eventId: string, callback: (data: any) => void) {
    this.listeners.get(eventId)?.delete(callback);
  }
}

export const eventBus = RaizenEventBus.getInstance();
