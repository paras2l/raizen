import { godCodeLogger } from './godCodeLogger';
import { verifyCodeword } from '../../../governance';

export class DualCodewordVault {
  async verifyDualAuth(admin: string, master: string): Promise<boolean> {
    godCodeLogger.log('Verifying Dual-Codeword Authorization sequence...');
    
    const adminLevel = await verifyCodeword(admin);
    const masterLevel = await verifyCodeword(master);

    const adminOk = adminLevel === 'admin' || adminLevel === 'master';
    const masterOk = masterLevel === 'master';

    if (adminOk && masterOk) {
      godCodeLogger.log('Dual-Codeword match confirmed.');
      return true;
    }

    godCodeLogger.denied('Dual-Codeword mismatch found.');
    return false;
  }
}

export const dualCodewordVault = new DualCodewordVault();
