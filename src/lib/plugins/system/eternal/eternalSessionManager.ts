import { EternalSession } from './eternalTypes';
import { eternalLogger } from './eternalLogger';

export class EternalSessionManager {
  private currentSession?: EternalSession;

  public async startLegacyInteraction(descendantId: string): Promise<void> {
    await eternalLogger.log(`Initiating legacy interaction for descendant: ${descendantId}`);
    this.currentSession = {
      sessionId: `ES_${Date.now()}`,
      descendantId,
      active: true,
      interactionTail: []
    };
  }

  public getSession(): EternalSession | undefined {
    return this.currentSession;
  }
}
