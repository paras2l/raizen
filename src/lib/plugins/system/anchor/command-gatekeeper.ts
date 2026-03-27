export class CommandGatekeeper {
  canExecute(actionId: string, isAnchored: boolean): boolean {
    const restricted = ['system_reset', 'secure_data_wipe', 'security_policy_change'];
    if (restricted.includes(actionId) && !isAnchored) {
      console.warn(`[ANCHOR-GATE] BLOCK: ${actionId} is locked outside safe zones.`);
      return false;
    }
    return true;
  }
}
