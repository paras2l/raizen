import { ledgerLogger } from './ledgerLogger';

export class LedgerSessionManager {
  logSession(action: string) {
    ledgerLogger.log(`Social capital session: ${action} active.`);
  }
}
