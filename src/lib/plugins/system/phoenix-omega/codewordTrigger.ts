import { phoenixConfig } from './phoenixConfig';
import { phoenixLogger } from './phoenixLogger';

export class CodewordTrigger {
  private static instance: CodewordTrigger;
  private isArmed = true;

  private constructor() {}

  static getInstance(): CodewordTrigger {
    if (!CodewordTrigger.instance) {
      CodewordTrigger.instance = new CodewordTrigger();
    }
    return CodewordTrigger.instance;
  }

  verify(input: string): boolean {
    if (!this.isArmed) return false;
    
    const normalizedInput = input.trim().toLowerCase();
    const normalizedCodeword = phoenixConfig.nuclearCodeword.trim().toLowerCase();

    if (normalizedInput === normalizedCodeword) {
      phoenixLogger.trigger(`Codeword match confirmed: "${normalizedInput}"`);
      return true;
    }

    return false;
  }

  disarm() {
    // Only for simulation/testing if needed, but in reality, Phoenix is always armed
    this.isArmed = false;
  }
}

export const phoenixTrigger = CodewordTrigger.getInstance();
