import { CosmicSignal, CosmicEvent, PioneerAlert } from './pioneerTypes';
import { pioneerLogger } from './pioneerLogger';

export class PioneerSessionManager {
  private activeStreams = new Map<string, CosmicSignal>();
  private cosmicLogs = new Map<string, CosmicEvent[]>();

  startSession(signal: CosmicSignal) {
    this.activeStreams.set(signal.id, signal);
    this.cosmicLogs.set(signal.id, []);
    pioneerLogger.log(`Deep-space monitoring session active for stream: ${signal.id}`);
  }

  logEvent(signalId: string, event: CosmicEvent) {
    const list = this.cosmicLogs.get(signalId) || [];
    list.push(event);
    this.cosmicLogs.set(signalId, list);
  }

  endSession(signalId: string) {
    this.activeStreams.delete(signalId);
    pioneerLogger.success(`Cosmic session ${signalId} archived in the Next Frontier ledger.`);
  }
}
