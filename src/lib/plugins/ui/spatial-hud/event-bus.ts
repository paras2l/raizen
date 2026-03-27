import { HUDEvent, SpatialOverlay } from './types';

type EventCallback = (event: HUDEvent) => void;

export class SpatialEventBus {
  private listeners: EventCallback[] = [];

  subscribe(callback: EventCallback) {
    this.listeners.push(callback);
  }

  trigger(action: 'show' | 'hide' | 'update' | 'pin', overlay: SpatialOverlay) {
    const event: HUDEvent = {
      id: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      overlay
    };

    this.listeners.forEach(cb => cb(event));
  }
}
