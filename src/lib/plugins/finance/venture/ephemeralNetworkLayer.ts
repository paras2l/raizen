import { ventureLogger } from './ventureLogger';
import { ventureConfig } from './ventureConfig';

export class EphemeralNetworkLayer {
  private activeLinks: Set<string> = new Set();

  async establishLink(nodeId: string): Promise<boolean> {
    ventureLogger.log(`Establishing ephemeral link to node ${nodeId}...`);

    // Simulated Stealth Connection Logic
    const encryptionTier = ventureConfig.encryptionTier;
    const isStealth = ventureConfig.stealthMode;

    if (isStealth) {
      ventureLogger.log(`Applying ${encryptionTier} encryption... Transient link established.`);
      this.activeLinks.add(nodeId);
      
      // Auto-terminate link after duration
      setTimeout(() => this.terminateLink(nodeId), ventureConfig.ephemeralLinkDurationMs);
      return true;
    }
    return false;
  }

  terminateLink(nodeId: string): void {
    if (this.activeLinks.has(nodeId)) {
      this.activeLinks.delete(nodeId);
      ventureLogger.log(`Ephemeral link to node ${nodeId} terminated [Footprint: ZERO].`);
    }
  }

  isSecure(nodeId: string): boolean {
    return this.activeLinks.has(nodeId);
  }
}

export const ephemeralNetworkLayer = new EphemeralNetworkLayer();
