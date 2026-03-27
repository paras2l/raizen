import { IdentityStatus, VerificationSession } from './trueBornTypes';
import { trueBornLogger } from './trueBornLogger';
import { BioRhythmScanner } from './bioRhythmScanner';
import { RhythmicKeyValidator } from './rhythmicKeyValidator';

export class IdentityVerifier {
  constructor(
    private scanner: BioRhythmScanner,
    private validator: RhythmicKeyValidator
  ) {}

  verifyIdentity(rhythmicKey: string): boolean {
    const signals = this.scanner.scanSignals();
    const keyValid = this.validator.validatePattern(rhythmicKey);
    const signalStable = this.scanner.isSignalStable();

    const isVerified = keyValid && signalStable;

    if (isVerified) {
      trueBornLogger.confirm('Identity anchored at biological level. Access granted.');
    } else {
      trueBornLogger.deny('Multi-factor biometric verification failed.');
    }

    return isVerified;
  }
}
