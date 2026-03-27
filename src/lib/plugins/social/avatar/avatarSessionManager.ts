import { AvatarSession } from './avatarTypes';
import { avatarLogger } from './avatarLogger';

export class AvatarSessionManager {
  private session: AvatarSession;

  constructor() {
    this.session = {
      id: 'session-' + Date.now(),
      activeNicheId: '',
      dailyGoal: 10,
      leadsFound: 0,
      outreachSent: 0
    };
  }

  updateSession(leads: number, sent: number) {
    this.session.leadsFound += leads;
    this.session.outreachSent += sent;
    avatarLogger.log(`Session state: ${this.session.leadsFound} leads / ${this.session.outreachSent} sent`);
  }

  getSession(): AvatarSession {
    return this.session;
  }
}
