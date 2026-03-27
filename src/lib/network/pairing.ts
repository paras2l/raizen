import { auditLedger } from '../governance';

/**
 * Raizen QR Pairing Protocol
 * Secure handshaking for linking mobile nodes to the Hub.
 */
export class PairingProtocol {
  private static instance: PairingProtocol;
  private activePairingCode: string | null = null;
  private pairingExpiry: number = 0;

  private constructor() {}

  static getInstance() {
    if (!PairingProtocol.instance) {
      PairingProtocol.instance = new PairingProtocol();
    }
    return PairingProtocol.instance;
  }

  generatePairingQR() {
    this.activePairingCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.pairingExpiry = Date.now() + 5 * 60 * 1000; // 5 minute TTL
    
    console.log(`[NETWORK] Generated Pairing Code: ${this.activePairingCode} (Expires in 5m)`);
    
    // In a real app, this would return a QR data URI.
    return {
      code: this.activePairingCode,
      url: `raizen://pair?code=${this.activePairingCode}&hub=raizen-hub.local`,
      expiresAt: new Date(this.pairingExpiry).toISOString()
    };
  }

  async verifyPairing(code: string, deviceId: string) {
    if (this.activePairingCode && code === this.activePairingCode && Date.now() < this.pairingExpiry) {
      await auditLedger.append('action_result', {
        action: 'device_pairing_success',
        deviceId,
        status: 'success'
      });
      this.activePairingCode = null; // Consume code
      return { success: true, token: `raizen-dev-${Math.random().toString(36).slice(2)}` };
    }
    
    return { success: false, error: 'Invalid or expired pairing code.' };
  }
}

export const pairingProtocol = PairingProtocol.getInstance();
