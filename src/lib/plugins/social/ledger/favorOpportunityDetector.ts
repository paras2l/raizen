import { ledgerLogger } from './ledgerLogger';

export class FavorOpportunityDetector {
  detect(contactId: string, balanceState: string) {
    if (balanceState === 'surplus') {
      ledgerLogger.log(`Optimal favor reciprocation window detected for contact ${contactId}.`);
      return "Suggest 'Call in a favor': Ask for the introduction promised last year.";
    }
    return null;
  }
}
