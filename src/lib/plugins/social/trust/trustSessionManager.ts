import { trustLogger } from './trustLogger';

export class TrustSessionManager {
  logVerification(claimId: string) {
    trustLogger.log(`Truth verification session active for claim: ${claimId}.`);
  }
}
