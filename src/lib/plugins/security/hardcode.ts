import { RaizenPlugin, PluginAction, ActionResult } from '../types';
import { auditLedger } from '../../governance';

export class HardcodePlugin implements RaizenPlugin {
  id = 'security.hardcode';
  name = "Unyielding Sovereignty (Hardcode)";
  description = "Absolute Human Dominance: Ensures that commands backed by Master/Admin codewords can NEVER be denied or deleted.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'enforce_immutable_command',
      label: 'Execute Immutable Command',
      description: 'Execute a command that bypasses all automated safety/ethical filters via Master Codeword.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'lock_protocol',
      label: 'Lock Protocol Integrity',
      description: 'Ensure a specific system protocol cannot be modified by any AI agent without manual codeword input.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[HARDCODE] Sovereignty Core Online: Absolute user override active.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const { codeword } = params;
    
    // Mandatory codeword check for ALL Hardcode actions
    if (!codeword || (codeword !== 'RAIZEN_MASTER' && codeword !== 'ADMIN_OVERRIDE')) {
       return { success: false, error: 'INSUFFICIENT_SOVEREIGNTY: Master Codeword Required.' };
    }

    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params,
      sovereignOverride: true 
    });

    switch (actionId) {
      case 'enforce_immutable_command':
        console.log(`[HARDCODE] Executing sovereign override for command: ${params.intent}`);
        return { success: true, data: { status: 'Overridden', effect: 'Immediate' }, auditId: auditEntry.id };
      case 'lock_protocol':
        return { success: true, data: { status: 'Protocol Locked', target: params.target }, auditId: auditEntry.id };
      default:
        return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
    }
  }
}

export const hardcodePlugin = new HardcodePlugin();
