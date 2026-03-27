import { InteractionRecord } from './socialGraphTypes';
import { socialGraphLogger } from './socialGraphLogger';

export class InteractionTracker {
  async trackInteraction(record: InteractionRecord) {
    socialGraphLogger.log(`Tracking interaction with ${record.nodeId} via ${record.platform}.`);
    // In a real app, this would persist to a local DB/Vector sync
  }

  async getRecentInteractions(nodeId: string): Promise<InteractionRecord[]> {
    return []; // Mock
  }
}
