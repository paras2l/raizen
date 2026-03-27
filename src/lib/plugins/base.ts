import { RaizenPlugin, PluginAction, ActionResult } from './types';
import { eventBus } from './core/event-bus';

/**
 * RaizenBasePlugin: The standard implementation for S+++ Rank protocols.
 * Provides built-in neural synapse capabilities.
 */
export abstract class RaizenBasePlugin implements RaizenPlugin {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract actions: PluginAction[];
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';
  protected singularityState: 'latent' | 'synchronized' = 'latent';

  async initialize(): Promise<void> {
    this.status = 'online';
    
    // Subscribe to the Global Genesis Handshake (S+++)
    this.onEvent('SINGULARITY_GENESIS_HANDSHAKE', (data) => {
      this.singularityState = 'synchronized';
      this.log(`Neural Synapse Confirmed. [Genesis Shift: ${new Date(data.timestamp).toLocaleTimeString()}]`);
    });

    this.onInitialize();
  }

  /**
   * Optional hook for subclass-specific initialization logic.
   */
  protected onInitialize(): void {}

  abstract execute(actionId: string, params: Record<string, any>): Promise<ActionResult>;

  emitEvent(eventId: string, data: any): void {
    eventBus.publish(eventId, { ...data, origin: this.id });
  }

  onEvent(eventId: string, callback: (data: any) => void): void {
    eventBus.subscribe(eventId, callback);
  }

  protected log(message: string) {
    console.log(`[${this.id.toUpperCase()}] ${message}`);
  }
}
