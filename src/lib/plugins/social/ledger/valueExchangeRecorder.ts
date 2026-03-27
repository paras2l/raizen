import { ValueExchange } from './ledgerTypes';
import { ledgerLogger } from './ledgerLogger';

export class ValueExchangeRecorder {
  recordExchange(contactId: string, given: string, received: string): ValueExchange {
    ledgerLogger.log(`Recording value exchange for ${contactId}...`);
    
    return {
      contactId,
      valueGiven: given ? [given] : [],
      valueReceived: received ? [received] : [],
      netBalance: (given ? 1 : 0) - (received ? 1 : 0)
    };
  }
}
