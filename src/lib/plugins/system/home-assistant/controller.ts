import { DeviceCommand } from './types';
import { HomeAssistantClient } from './client';

export class DeviceController {
  private client: HomeAssistantClient;

  constructor(client: HomeAssistantClient) {
    this.client = client;
  }

  async turnOn(entityId: string, params?: Record<string, any>) {
    const domain = entityId.split('.')[0];
    return this.client.callServiceWithRetry({
      domain,
      service: 'turn_on',
      entity_id: entityId,
      params
    });
  }

  async turnOff(entityId: string) {
    const domain = entityId.split('.')[0];
    return this.client.callServiceWithRetry({
      domain,
      service: 'turn_off',
      entity_id: entityId
    });
  }

  async lock(entityId: string) {
    return this.client.callServiceWithRetry({
      domain: 'lock',
      service: 'lock',
      entity_id: entityId
    });
  }

  async unlock(entityId: string) {
    return this.client.callServiceWithRetry({
      domain: 'lock',
      service: 'unlock',
      entity_id: entityId
    });
  }

  async setTemperature(entityId: string, temperature: number) {
    return this.client.callServiceWithRetry({
      domain: 'climate',
      service: 'set_temperature',
      entity_id: entityId,
      params: { temperature }
    });
  }

  async activateScene(sceneId: string) {
    return this.client.callServiceWithRetry({
      domain: 'scene',
      service: 'turn_on',
      entity_id: sceneId
    });
  }

  // Domain-aware safety validation
  validateEntity(entityId: string): boolean {
    const validDomains = ['light', 'switch', 'lock', 'climate', 'scene', 'sensor', 'binary_sensor'];
    const domain = entityId.split('.')[0];
    return validDomains.includes(domain);
  }
}
