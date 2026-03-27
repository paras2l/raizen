import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { anchorLogger } from './anchorLogger';
import { HardwareAuthController } from './hardwareAuthController';
import { CommandGatekeeper } from './commandGatekeeper';
import { AuditLogger } from './auditLogger';
import { CommandRisk } from './anchorTypes';

export class AnchorProtocolService implements RaizenPlugin {
  id = 'security.anchor';
  name = 'Anchor Protocol';
  description = 'Hardware-Gated Command Sovereignty & Physical Auth';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'anchor-hardware-validate',
      label: 'Validate Hardware Key',
      description: 'Request physical touch on a security key for a new session',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'anchor-gate-command',
      label: 'Gate High-Risk Command',
      description: 'Intercept and authorize a critical system operation',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'anchor-audit-ledger',
      label: 'View Audit Ledger',
      description: 'Retrieve the immutable history of gated commands',
      category: 'security',
      sensitive: true,
    }
  ];

  private auth = new HardwareAuthController();
  private gatekeeper = new CommandGatekeeper(this.auth);
  private auditor = new AuditLogger();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    anchorLogger.log('Anchor Protocol Initializing [HARDWARE ENFORCEMENT ACTIVE]');
    this.status = 'online';
    anchorLogger.success('Physical sovereignty layer ready.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'anchor-hardware-validate':
          const success = await this.auth.requestPhysicalTouch();
          return { success, data: { status: success ? 'Validated' : 'Failed' } };

        case 'anchor-gate-command':
          const commandId = params.targetCommand || 'PHOENIX-WRITE';
          const risk = (params.risk as CommandRisk) || 'High';
          const authorized = await this.gatekeeper.authorizeCommand(commandId, risk, params);
          
          this.auditor.logAttempt(commandId, risk, authorized, authorized ? (params.emergencyCodeword ? 'Codeword' : 'YubiKey') : undefined);
          
          return { success: authorized, data: { authorized, commandId } };

        case 'anchor-audit-ledger':
          const ledger = this.auditor.getLedger();
          return { success: true, data: { ledger } };

        default:
          anchorLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      anchorLogger.error(`Hardware auth operational failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    anchorLogger.log('Anchor Protocol offline [GATES SEALED].');
  }
}

export const anchorProtocol = new AnchorProtocolService();
