import { phoenixConfig } from './phoenixConfig';
import { phoenixLogger } from './destructionLogger';

export class ConfirmationGate {
  private isArmed: boolean = false;

  arm(codeword: string): boolean {
    if (codeword === phoenixConfig.nuclearCodeword) {
      this.isArmed = true;
      phoenixLogger.alert('Codeword "paro the god" accepted. System is now ARMED.');
      return true;
    }
    phoenixLogger.log('Invalid nuclear codeword attempt.');
    return false;
  }

  isAuthorized(hardwareConfirmed: boolean): boolean {
    return this.isArmed && hardwareConfirmed;
  }
}
