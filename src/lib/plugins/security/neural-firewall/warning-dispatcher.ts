export class UserWarningDispatcher {
  dispatchWarning(message: string) {
    console.warn(`[NEURAL-FIREWALL] DISPATCH ALERT: ${message}`);
  }
}
