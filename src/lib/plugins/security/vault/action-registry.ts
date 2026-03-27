import { VaultAction } from './types';

export class SecureActionRegistry {
  private protectedActions: Map<string, VaultAction> = new Map([
    ['system_wipe', { 
      id: 'system_wipe', 
      actionId: 'security.hardcode:wipe_all', 
      description: 'Total destruction of Raizen memory and identity.',
      requiredSignatures: ['MASTER_CODEWORD', 'MOBILE_DEVICE', 'HARDWARE_KEY'],
      status: 'awaiting_signatures'
    }],
    ['admin_change', {
      id: 'admin_change',
      actionId: 'system.core:change_admin',
      description: 'Changing root administrator credentials.',
      requiredSignatures: ['MASTER_CODEWORD', 'HARDWARE_KEY'],
      status: 'awaiting_signatures'
    }]
  ]);

  isProtected(actionId: string): boolean {
    return this.protectedActions.has(actionId);
  }

  getAction(actionId: string): VaultAction | undefined {
    return this.protectedActions.get(actionId);
  }
}
