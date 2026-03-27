import { ArtisticAsset } from './artisanTypes';
import { artisanLogger } from './artisanLogger';

export class MediaSessionManager {
  private activeSessions = new Map<string, ArtisticAsset>();

  startSession(asset: ArtisticAsset) {
    this.activeSessions.set(asset.id, asset);
    artisanLogger.log(`Session started: ${asset.id}`);
  }

  endSession(id: string) {
    this.activeSessions.delete(id);
    artisanLogger.log(`Session ended: ${id}`);
  }

  getActiveSessions(): ArtisticAsset[] {
    return Array.from(this.activeSessions.values());
  }
}
