import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { SecureActionRegistry } from './action-registry';
import { MobileApprovalGateway } from './mobile-gateway';
import { HardwareKeyConnector } from './hardware-connector';
import { SignatureManager } from './signature-manager';
import { MultiSigValidator } from './validator';
import { VaultExecutionController } from './execution-controller';
import { ApprovalSession, SignatureSource, Signature } from './types';

/**
 * Multi-Sig Hardware Verification (The 'Vault' Protocol)
 * High-risk actions require a secondary cryptographic "sign-off" from a linked mobile node or hardware key.
 */
export class VaultProtocolPlugin implements RaizenPlugin {
  id = 'security.vault';
  name = 'Multi-Sig Hardware Verification (Vault)';
  description = 'Requires secondary cryptographic sign-off for catastrophic changes. [VAULT-PROTOCOL ACTIVE]';
  status: 'online' | 'offline' | 'connecting' | 'error' = 'online';

  private registry = new SecureActionRegistry();
  private mobileGateway = new MobileApprovalGateway();
  private hardwareConnector = new HardwareKeyConnector();
  private sigManager = new SignatureManager();
  private validator = new MultiSigValidator();
  private execution = new VaultExecutionController();

  private activeSessions: Map<string, ApprovalSession> = new Map();

  actions: PluginAction[] = [
    {
      id: 'init_multi_sig',
      label: 'Initialize Multi-Sig',
      description: 'Start a multi-sig authorization session for a protected action.',
      category: 'security',
      sensitive: true
    },
    {
      id: 'submit_proof',
      label: 'Submit Proof',
      description: 'Submit a cryptographic signature from a verified source.',
      category: 'security',
      sensitive: true
    },
    {
       id: 'execute_vault_mission',
       label: 'Execute Vault Mission',
       description: 'Finalize and execute the gated action if all signatures are verified.',
       category: 'security',
       sensitive: true
    },
    {
      id: 'request-sig',
      label: 'Request Signature',
      description: 'Trigger a signature request on the linked hardware key or mobile node.',
      category: 'security',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    console.log('[VAULT] Multi-sig interlocks active. Cryptographic layer synchronized.');
    this.status = 'online';
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
        switch (actionId) {
          case 'init_multi_sig':
            return this.handleInit(params);
          case 'submit_proof':
            return this.handleSubmit(params);
          case 'execute_vault_mission':
            return await this.handleExecute(params);
          case 'request-sig':
             return await this.handleRequestSig(params);
          default:
            return { success: false, error: 'Vault Interlock Barrier.' };
        }
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  private handleInit(params: Record<string, any>): ActionResult {
    const { targetActionId } = params;
    const actionDef = this.registry.getAction(targetActionId);
    
    if (!actionDef) {
       return { success: false, error: 'ACTION_NOT_PROTECTED', data: { message: 'This mission does not require Vault intervention.' } };
    }

    const sessionId = `VAULT-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const session: ApprovalSession = {
       id: sessionId,
       action: { ...actionDef },
       collectedSignatures: [],
       expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min
    };

    this.activeSessions.set(sessionId, session);
    return { success: true, data: { sessionId, required: actionDef.requiredSignatures, status: 'PENDING' } };
  }

  private handleSubmit(params: Record<string, any>): ActionResult {
    const { sessionId, source, signature } = params;
    const session = this.activeSessions.get(sessionId);
    
    if (!session) return { success: false, error: 'SESSION_NOT_FOUND' };

    const sig: Signature = { 
       source: source as SignatureSource, 
       signature, 
       timestamp: new Date().toISOString() 
    };

    if (this.sigManager.verify(sig)) {
       session.collectedSignatures.push(sig);
       const isComplete = this.validator.isValid(session);
       if (isComplete) session.action.status = 'authorized';
       
       return { 
         success: true, 
         data: { 
           sessionStatus: session.action.status, 
           collected: session.collectedSignatures.map(s => s.source),
           isComplete 
         } 
       };
    }

    return { success: false, error: 'INVALID_SIGNATURE' };
  }

  private async handleExecute(params: Record<string, any>): Promise<ActionResult> {
    const { sessionId } = params;
    const session = this.activeSessions.get(sessionId);
    
    if (!session) return { success: false, error: 'SESSION_NOT_FOUND' };
    if (!this.validator.isValid(session)) return { success: false, error: 'INCOMPLETE_MULTI_SIG', data: { missing: session.action.requiredSignatures } };

    const success = await this.execution.execute(session.action.actionId, {});
    if (success) {
       this.activeSessions.delete(sessionId);
       return { success: true, data: { mission: session.action.description, status: 'FINALIZED' } };
    }

    return { success: false, error: 'EXECUTION_FAILURE' };
  }

  private async handleRequestSig(params: Record<string, any>): Promise<ActionResult> {
     const { type } = params;
     let signature = '';
     
     if (type === 'MOBILE_DEVICE') {
        signature = await this.mobileGateway.requestMobileApproval('VAULT_SIG_REQ');
     } else if (type === 'HARDWARE_KEY') {
        signature = await this.hardwareConnector.requestHardwareSignature('VAULT_CHALLENGE');
     } else {
        return { success: false, error: 'UNSUPPORTED_DEVICE_TYPE' };
     }

     return { success: true, data: { signature, type } };
  }
}

export const vaultProtocol = new VaultProtocolPlugin();
