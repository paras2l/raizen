import { godCodeLogger } from './godCodeLogger';
import { biometricScanner } from './biometricScanner';
import { dualCodewordVault } from './dualCodewordVault';
import { ValidationResult, AuthTier } from './godCodeTypes';

export class AuthorizationEngine {
  async authorize(tier: AuthTier, params: any): Promise<ValidationResult> {
    godCodeLogger.log(`Requesting ${tier}-Tier Authorization...`);

    // 1. Primary: Biometric Pulse
    if (params.biometricPulse) {
      const isValid = biometricScanner.validatePulse(params.biometricPulse);
      if (isValid) {
        godCodeLogger.authorized(tier, 'Neural-Pulse');
        return { authorized: true, tier, method: 'Neural-Pulse', token: 'AUTH-PULSE-GOLDEN' };
      }
    }

    // 2. Fallback: Dual-Codeword
    if (params.adminCode && params.masterCode) {
      godCodeLogger.fallback();
      const isOk = await dualCodewordVault.verifyDualAuth(params.adminCode, params.masterCode);
      if (isOk) {
        godCodeLogger.authorized(tier, 'Dual-Codeword');
        return { authorized: true, tier, method: 'Dual-Codeword', token: 'AUTH-CODE-SILVER' };
      }
    }

    godCodeLogger.denied('All authorization methods exhausted or failed.');
    return { authorized: false, tier, method: 'Denied' };
  }
}

export const authorizationEngine = new AuthorizationEngine();
