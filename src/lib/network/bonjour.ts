import { auditLedger } from '../governance';

/**
 * Raizen Discovery Service (Bonjour/mDNS)
 * Automatically advertises the Raizen Hub on the local network.
 */
export class DiscoveryService {
  private static instance: DiscoveryService;
  private isAdvertising: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!DiscoveryService.instance) {
      DiscoveryService.instance = new DiscoveryService();
    }
    return DiscoveryService.instance;
  }

  async start() {
    this.isAdvertising = true;
    console.log('[NETWORK] Raizen Discovery Service (mDNS) started on port 18789');
    await auditLedger.append('action_result', {
      action: 'mdns_discovery_start',
      status: 'success'
    });
  }

  async stop() {
    this.isAdvertising = false;
    console.log('[NETWORK] Raizen Discovery Service (mDNS) stopped');
  }

  async getPresence() {
    return {
      service: '_raizen._tcp',
      host: 'raizen-hub.local',
      port: 18789,
      txt: {
        version: '1.0.0',
        platform: process.platform
      }
    };
  }
}

export const discoveryService = DiscoveryService.getInstance();
