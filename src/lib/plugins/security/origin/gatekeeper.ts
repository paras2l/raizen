export class AuthenticationGate {
  isAuthorized = false;

  authorize() {
    this.isAuthorized = true;
    console.log('[ORIGIN-GATE] System access granted. Identity anchored.');
  }

  deauthorize() {
    this.isAuthorized = false;
    console.warn('[ORIGIN-GATE] Access revoked. Identity detached.');
  }
}
