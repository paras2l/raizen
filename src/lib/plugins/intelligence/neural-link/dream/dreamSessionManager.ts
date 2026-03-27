import { UnresolvedProblem, MorningBriefing } from './dreamTypes';
import { dreamLogger } from './dreamLogger';

export class DreamSessionManager {
  private activeBriefing?: MorningBriefing;

  public async setBriefing(briefing: MorningBriefing) {
    this.activeBriefing = briefing;
    await dreamLogger.log('New morning briefing available in session state.');
  }

  public getBriefing(): MorningBriefing | undefined {
    return this.activeBriefing;
  }

  public clearBriefing() {
    this.activeBriefing = undefined;
  }
}
