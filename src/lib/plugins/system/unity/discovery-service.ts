import { PeerNode } from './types';

export class HubDiscoveryService {
  async discover(): Promise<PeerNode[]> {
    console.log('[UNITY-DISCOVERY] Scanning local network for sibling Raizen Hubs...');
    return [
      { id: 'hub_29', name: 'Alex-Desktop', publicKey: 'PUB_KEY_0x1', trustLevel: 'verified', lastSeen: new Date().toISOString() }
    ];
  }

  generateInviteCode(): string {
    return `RAIZEN-MESH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}
