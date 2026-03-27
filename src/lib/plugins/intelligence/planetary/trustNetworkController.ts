import { TrustPolicy } from './planetaryTypes';
import { planetaryLogger } from './planetaryLogger';

export class TrustNetworkController {
  public async updateTrustPolicy(policy: TrustPolicy): Promise<void> {
    await planetaryLogger.log(`Updating mesh trust parameters. Policy: ${policy.policyId} Encryption: ${policy.encryptionLevel}`);
  }
}
