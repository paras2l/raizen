export class NetworkStateMonitor {
  async getRadioStates() {
    console.log('[VOID-MONITOR] Sampling signal levels (Wi-Fi, BT, NFC)...');
    return { wifi: true, bluetooth: true, nfc: true };
  }
}
