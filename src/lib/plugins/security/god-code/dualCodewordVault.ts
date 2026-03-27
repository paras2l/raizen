import { godCodeLogger } from './godCodeLogger';
import { ADMIN_CODEWORD, MASTER_CODEWORD } from '../../../governance';

export class DualCodewordVault {
  private adminCodeword = 'admin alpha'; // Legacy/Simulated
  private masterCodeword = 'paro the god'; // S+++ Executive

  verifyDualAuth(admin: string, master: string): boolean {
    godCodeLogger.log('Verifying Dual-Codeword Authorization sequence...');
    
    const adminOk = admin === this.adminCodeword || admin === ADMIN_CODEWORD;
    const masterOk = master === this.masterCodeword || master === MASTER_CODEWORD;

    if (adminOk && masterOk) {
      godCodeLogger.log('Dual-Codeword match confirmed.');
      return true;
    }

    godCodeLogger.denied('Dual-Codeword mismatch found.');
    return false;
  }
}

export const dualCodewordVault = new DualCodewordVault();
