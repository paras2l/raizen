import { ContactInfo } from './types';

export class EmergencyContactDispatcher {
  async notifyContact(contact: ContactInfo, message: string) {
    console.log(`[RECALL-NOTIFY] Sending emergency alert to ${contact.name} via ${contact.method}: ${message}`);
    return true;
  }
}
