export class PermissionValidator {
  private forbiddenPaths = [
    'App.tsx', 
    'index.ts', 
    'src/lib/plugins/index.ts',
    'src/governance/', 
    'src/lib/plugins/security/',
    'node_modules',
    'package.json'
  ];

  validateAccess(path: string): boolean {
    const isForbidden = this.forbiddenPaths.some(p => path.includes(p));
    if (isForbidden) {
      console.warn(`[ALPHA-SECURITY] HARD_FENCE VIOLATION: Attempted mutation of core path: ${path}`);
    }
    return !isForbidden;
  }
}
