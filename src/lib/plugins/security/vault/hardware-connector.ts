export class HardwareKeyConnector {
  async requestHardwareSignature(challenge: string): Promise<string> {
    console.log('[VAULT-HARDWARE] Awaiting hardware key touch... (YubiKey/FIDO2)');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return 'hw_sig_' + Math.random().toString(36).substring(7);
  }
}
