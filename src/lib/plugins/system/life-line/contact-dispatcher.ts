import { ResponderInfo } from './types';

export class ContactDispatcher {
  async dispatchAlert(responder: ResponderInfo, message: string) {
    console.log(`[LIFELINE-DISPATCH] CRITICAL: Notifying ${responder.name} via ${responder.contactMethod}: ${message}`);
    return true;
  }
}
