import { VisionSession, VisionSessionStatus } from './types';

export class PermissionGate {
  private activeSession: VisionSession | null = null;

  grant(durationMinutes: number = 5): VisionSession {
    console.log(`[CYCLOPS-GATE] Vision access AUTHORIZED for ${durationMinutes} minutes.`);
    
    this.activeSession = {
      id: `vis_${Date.now()}`,
      startTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + durationMinutes * 60000).toISOString(),
      status: 'active'
    };

    return this.activeSession;
  }

  isAuthorized(): boolean {
    if (!this.activeSession) return false;
    if (new Date() > new Date(this.activeSession.expiresAt)) {
      this.activeSession.status = 'expired';
      return false;
    }
    return true;
  }

  revoke() {
    this.activeSession = null;
    console.log('[CYCLOPS-GATE] Vision access REVOKED.');
  }
}
