import { HAConfig, HAEntity, DeviceCommand } from './types';

export class HomeAssistantClient {
  private config: HAConfig;

  constructor(config: HAConfig) {
    this.config = config;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/`, {
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.message === "API running.";
    } catch (error) {
      console.error('[HA-CLIENT] Connection test failed:', error);
      return false;
    }
  }

  async getEntityState(entityId: string): Promise<HAEntity | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/states/${entityId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(`[HA-CLIENT] Failed to fetch state for ${entityId}:`, error);
      return null;
    }
  }

  async callService(command: DeviceCommand): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/services/${command.domain}/${command.service}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entity_id: command.entity_id,
          ...command.params
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`HA API Error: ${err}`);
      }
      return true;
    } catch (error) {
      console.error(`[HA-CLIENT] Service call failed [${command.domain}.${command.service}]:`, error);
      return false;
    }
  }

  // Implementation of simple retry logic for resilient connectivity
  async callServiceWithRetry(command: DeviceCommand, retries = 3): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      const success = await this.callService(command);
      if (success) return true;
      console.warn(`[HA-CLIENT] Retry ${i + 1}/${retries} for ${command.entity_id}`);
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential-ish backoff
    }
    return false;
  }
}
