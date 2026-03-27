import { edgeLogger } from './edgeLogger';

export class EdgeSessionManager {
  logActivity(sessionType: string) {
    edgeLogger.log(`Edge intelligence session: ${sessionType} active.`);
  }
}
