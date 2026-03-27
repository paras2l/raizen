import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { trueBornLogger } from './trueBornLogger';
import { BioRhythmScanner } from './bioRhythmScanner';
import { RhythmicKeyValidator } from './rhythmicKeyValidator';
import { IdentityVerifier } from './identityVerifier';
import { AccessGate } from './accessGate';
import { IdentityStatus } from './trueBornTypes';

export class TrueBornProtocolService implements RaizenPlugin {
  id = 'security.true-born';
  name = 'True-Born Protocol';
  description = 'Immutable Identity Anchor & Biological Locking';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'true-born-verify',
      label: 'Verify Biological Identity',
      description: 'Perform a multi-factor biometric and rhythmic key verification',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'true-born-gate-status',
      label: 'Set Identity Gate Level',
      description: 'Activate or deactivate mandatory verification for high-risk zones',
      category: 'security',
      sensitive: true,
    },
    {
      id: 'true-born-status-get',
      label: 'Get Identity Status',
      description: 'Retrieve current biometric confidence and verification state',
      category: 'security',
      sensitive: true,
    }
  ];

  private scanner = new BioRhythmScanner();
  private validator = new RhythmicKeyValidator();
  private verifier = new IdentityVerifier(this.scanner, this.validator);
  private gate = new AccessGate();
  private identityStatus: IdentityStatus = 'Unverified';

  async initialize(): Promise<void> {
    this.status = 'connecting';
    trueBornLogger.log('True-Born Protocol Initializing [IDENTITY ANCHOR STANDBY]');
    this.status = 'online';
    this.identityStatus = 'Unverified';
    trueBornLogger.success('Identity verification layer activated.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'true-born-verify':
          const key = params.rhythmicKey || '';
          if (this.verifier.verifyIdentity(key)) {
            this.identityStatus = 'Verified';
            return { success: true, data: { status: 'Verified', confidence: 0.99 } };
          }
          this.identityStatus = 'Locked';
          return { success: false, error: 'Verification failed. Identity locked.' };

        case 'true-born-gate-status':
          const active = params.active === true;
          this.gate.setHighRiskStatus(active);
          return { success: true, data: { gateActive: active } };

        case 'true-born-status-get':
          return { success: true, data: { status: this.identityStatus, scannerStable: this.scanner.isSignalStable() } };

        default:
          trueBornLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      trueBornLogger.error(`Identity verification failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    trueBornLogger.log('True-Born Protocol offline [BIOMETRICS IDLE].');
  }
}

export const trueBornProtocol = new TrueBornProtocolService();
