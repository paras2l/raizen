import { RaizenPlugin, ActionResult, PluginAction, PluginCategoryId } from './types';
import { auditLedger } from '../governance';
import { ghostEngine } from '../ghost/engine';
import { GHOST_SCRIPTS } from '../ghost/automation';

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
    
    // 1. Try Baileys (API Bridge) - currently stubbed
    const apiSuccess = false; // Simulated failure to trigger fallback
    
    if (apiSuccess) {
      return { success: true, data: { status: 'sent_via_api', to, text } };
    }

    // 2. Zero Fallback: Ghost Power
    console.log(`[WHATSAPP] API unavailable. Triggering Ghost Fallback...`);
    try {
      await ghostEngine.activate('whatsapp', 'https://web.whatsapp.com');
      const result = await ghostEngine.execute('whatsapp', GHOST_SCRIPTS.whatsapp.send(to, text));
      
      return { 
        success: result.success, 
        data: { ...result, mode: 'ghost' },
        auditId: await auditLedger.append('action_result', { 
          plugin: 'whatsapp', 
          mode: 'ghost', 
          target: to 
        })
      };
    } catch (err: any) {
      return { success: false, error: `Ghost fallback failed: ${err.message}` };
    }
  }

  onMessage(callback: (msg: any) => void): void {
    this.messageCallback = callback;
  }
}

export const whatsappPlugin = new WhatsAppPlugin();
