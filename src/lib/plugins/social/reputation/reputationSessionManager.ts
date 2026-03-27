import { reputationLogger } from './reputationLogger';

export class ReputationSessionManager {
  logSession(id: string) {
    reputationLogger.log(`Monitoring session ${id} active.`);
  }
}
