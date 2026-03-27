export class AccessGatekeeper {
  canAccess(moduleId: string): boolean {
    const trusted = ['core.brain', 'security.vault', 'intelligence.paro'];
    return trusted.includes(moduleId);
  }

  logAccess(moduleId: string, volumeId: string) {
    console.log(`[PHANTOM-GATE] Access granted to ${moduleId} for volume ${volumeId}`);
  }
}
