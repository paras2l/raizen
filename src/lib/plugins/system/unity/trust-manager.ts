export class TrustPermissionManager {
  private allowedActions = new Set(['share_research', 'sync_technical_docs']);

  isAuthorized(actionId: string): boolean {
    const ok = this.allowedActions.has(actionId);
    if (!ok) console.warn(`[UNITY-TRUST] BLOCKED: Unauthorized mesh action attempt: ${actionId}`);
    return ok;
  }
}
