import { advisorLogger } from './advisorLogger';

export class AdvisorSessionManager {
  logSession(id: string) {
    advisorLogger.log(`Jurisdiction monitoring session ${id} active.`);
  }
}
