import { BroadcastPacket } from './phantomTypes';
import { phantomLogger } from './phantomLogger';

export class PhantomSessionManager {
  private activeBroadcasts = new Map<string, BroadcastPacket>();

  startSession(packet: BroadcastPacket) {
    this.activeBroadcasts.set(packet.id, packet);
    phantomLogger.log(`Phantom session active: ${packet.id}`);
  }

  endSession(packetId: string) {
    this.activeBroadcasts.delete(packetId);
    phantomLogger.success(`Phantom session ${packetId} concluded.`);
  }

  getActiveSessions(): BroadcastPacket[] {
    return Array.from(this.activeBroadcasts.values());
  }
}
