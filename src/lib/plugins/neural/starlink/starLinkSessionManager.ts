import { OrbitalStream, NeuralPacket } from './starLinkTypes';
import { starLinkLogger } from './starLinkLogger';

export class StarLinkSessionManager {
  private activeStreams = new Map<string, OrbitalStream>();
  private sessionHistory: NeuralPacket[] = [];

  startSession(stream: OrbitalStream) {
    this.activeStreams.set(stream.id, stream);
    starLinkLogger.log(`Orbital session synchronized: ${stream.id}`);
  }

  recordPacket(packet: NeuralPacket) {
    this.sessionHistory.push(packet);
    if (this.sessionHistory.length > 1000) this.sessionHistory.shift();
  }

  endSession(streamId: string) {
    this.activeStreams.delete(streamId);
    starLinkLogger.success(`Orbital session ${streamId} terminated safely.`);
  }

  getActiveStreams(): OrbitalStream[] {
    return Array.from(this.activeStreams.values());
  }
}
