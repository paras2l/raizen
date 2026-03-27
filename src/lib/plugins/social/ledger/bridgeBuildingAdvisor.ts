import { ledgerLogger } from './ledgerLogger';

export class BridgeBuildingAdvisor {
  suggest(contactId: string, deficit: boolean): string {
    ledgerLogger.log(`Generating bridge-building advice for ${contactId}...`);
    return deficit 
      ? "Send a technical resource relevant to their recent project to balance the ledger."
      : "Strengthen the bond by acknowledging their recent milestone.";
  }
}
