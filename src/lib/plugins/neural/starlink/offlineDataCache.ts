import { CacheStatus, NeuralPacket } from './starLinkTypes';
import { starLinkLogger } from './starLinkLogger';
import { starLinkConfig } from './starLinkConfig';

export class OfflineDataCache {
  private cache = new Map<string, NeuralPacket>();

  async storePacket(packet: NeuralPacket) {
    starLinkLogger.cache(`Caching packet ${packet.id} for offline access...`);
    this.cache.set(packet.id, packet);
    
    // Simulate encryption and storage
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  getStatus(): CacheStatus {
    return {
      sizeMb: this.cache.size * 0.5, // Dummy calculation
      availableSpaceMb: starLinkConfig.cacheLimitMb - (this.cache.size * 0.5),
      retentionDays: 30,
    };
  }

  clearOldCache() {
    this.cache.clear();
    starLinkLogger.log('Offline cache purged.');
  }
}
