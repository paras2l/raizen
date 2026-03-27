import { apexLogger } from './apexLogger';
import { MasterPasswordGate } from './masterPasswordGate';

export class HighRiskLogicController {
  constructor(private gate: MasterPasswordGate) {}

  async executeSensitiveOperation(opId: string, action: () => Promise<any>): Promise<any> {
    apexLogger.log(`Targeting system-wide operation: ${opId}...`);

    if (!this.gate.isAuthorized()) {
      apexLogger.alert(`Operation ${opId} blocked. Master Password authorization required.`);
      const authorized = await this.gate.requestMasterPassword();
      if (!authorized) throw new Error('Authorization required for Apex-level operations.');
    }

    apexLogger.success(`Executing Sovereign Logic [${opId}]...`);
    const result = await action();
    
    // Revoke for security
    this.gate.revokeAccess();
    return result;
  }
}
