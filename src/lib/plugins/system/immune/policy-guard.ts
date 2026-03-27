export class ImmunePolicyGuard {
  private immutablePaths = ['/lib/security/', '/core/codewords/'];

  canModify(path: string): boolean {
    const isForbidden = this.immutablePaths.some(p => path.includes(p));
    if (isForbidden) {
      console.error(`[IMMUNE-GUARD] BLOCKED: Unauthorized attempt to modify immutable zone: ${path}`);
    }
    return !isForbidden;
  }
}
