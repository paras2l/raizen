import { AccessProfile } from './passportTypes';
import { passportLogger } from './passportLogger';

export class PassportSessionManager {
  private sessionHistory: AccessProfile[] = [];

  startSession() {
    passportLogger.log('Global digital citizenship session active.');
  }

  logAccess(profile: AccessProfile) {
    this.sessionHistory.push(profile);
    passportLogger.log(`Access event archived: ${profile.id}`);
  }

  getHistory(): AccessProfile[] {
    return this.sessionHistory;
  }
}
