import { outreachLogger } from './outreachLogger';

export class OutreachSessionManager {
  logSession(id: string) {
    outreachLogger.log(`Outreach intelligence session ${id} initiated.`);
  }
}
