import { InteractionEvent } from './ledgerTypes';
import { ledgerLogger } from './ledgerLogger';

export class InteractionEventTracker {
  async record(contactId: string, type: any, description: string): Promise<InteractionEvent> {
    ledgerLogger.log(`Recording interaction event with contact ${contactId}: ${description}`);
    
    return {
      id: 'evt-' + Date.now(),
      contactId,
      type,
      description,
      timestamp: new Date().toISOString()
    };
  }
}
