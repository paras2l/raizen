import { navigatorLogger } from './navigatorLogger';

export class NavigatorSessionManager {
  logSession(id: string) {
    navigatorLogger.log(`Strategic navigation session ${id} active.`);
  }
}
