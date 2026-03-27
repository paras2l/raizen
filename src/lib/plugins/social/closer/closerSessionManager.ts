import { closerLogger } from './closerLogger';

export class CloserSessionManager {
  logActivity(dealId: string) {
    closerLogger.log(`Active negotiation cycle: ${dealId} in progress.`);
  }
}
