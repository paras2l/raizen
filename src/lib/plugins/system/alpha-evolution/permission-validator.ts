export class PermissionValidator {
  private forbiddenPaths = ['/core/', '/security/', '/codewordPolicies/'];

  validateAccess(path: string): boolean {
    const isForbidden = this.forbiddenPaths.some(p => path.includes(p));
    if (isForbidden) {
      console.warn(`[ALPHA-SECURITY] BLOCKED: Attempted mutation of forbidden path: ${path}`);
    }
    return !isForbidden;
  }
}
