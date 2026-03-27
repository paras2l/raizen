import { socialGraphLogger } from './socialGraphLogger';

export class SocialSessionManager {
  logActivity(nodeId: string) {
    socialGraphLogger.log(`Relationship session active for node: ${nodeId}.`);
  }
}
