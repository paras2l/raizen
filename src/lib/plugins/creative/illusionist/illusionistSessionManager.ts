import { RealityOverlay } from './illusionistTypes';
import { illusionistLogger } from './illusionistLogger';

export class IllusionistSessionManager {
  private activeOverlays = new Map<string, RealityOverlay>();

  registerOverlay(overlay: RealityOverlay) {
    this.activeOverlays.set(overlay.id, overlay);
    illusionistLogger.log(`Reality session updated: ${overlay.id} active.`);
  }

  clearAll() {
    this.activeOverlays.clear();
    illusionistLogger.log('Reality session cleared. Returning to base observation.');
  }

  getActiveOverlays(): RealityOverlay[] {
    return Array.from(this.activeOverlays.values());
  }
}
