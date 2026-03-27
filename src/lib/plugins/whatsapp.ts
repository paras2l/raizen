import { RaizenPlugin, ActionResult, PluginAction, PluginCategoryId } from './types';
import { auditLedger } from '../governance';

/**
 * Raizen WhatsApp Bridge
 * Ported from @openclaw/whatsapp logic.
 */
export class WhatsAppPlugin implements RaizenPlugin {
  id = 'whatsapp';
  name = 'WhatsApp';
  description = 'Direct connection to WhatsApp Web / Mobile.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    { id: 'send', label: 'Send Message', description: 'Send a message to a contact or group.', category: 'communication', sensitive: true, icon: 'Send' },
    { id: 'sync', label: 'Sync Contacts', description: 'Fetch latest contact list.', category: 'communication', sensitive: false, icon: 'RefreshCw' },
    { id: 'inbox', label: 'Check Inbox', description: 'Read latest unread messages.', category: 'communication', sensitive: true, icon: 'Mail' },
  ];

  private messageCallback?: (msg: any) => void;

  async initialize(): Promise<void> {
    this.status = 'connecting';
    console.log('[WHATSAPP] Initializing Baileys bridge...');
    // In a real environment, this would start the Baileys socket
    // For now, we stub the connection state
    setTimeout(() => {
      this.status = 'online';
      auditLedger.append('action_result', { plugin: 'whatsapp', status: 'ready' });
    }, 2000);
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    if (this.status !== 'online') return { success: false, error: 'WhatsApp is not connected.' };

    switch (actionId) {
      case 'send':
        return this.sendMessage(params.to, params.text);
      case 'inbox':
        return { success: true, data: [] }; // Mocked
      default:
        return { success: false, error: `Action ${actionId} not supported.` };
    }
  }

  private async sendMessage(to: string, text: string): Promise<ActionResult> {
    console.log(`[WHATSAPP] Sending message to ${to}: ${text}`);
    // Actual Baileys send logic would go here
    return { success: true, data: { status: 'sent', to, text } };
  }

  onMessage(callback: (msg: any) => void): void {
    this.messageCallback = callback;
  }
}

export const whatsappPlugin = new WhatsAppPlugin();
