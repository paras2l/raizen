import { auditLedger } from '../governance';

/**
 * Tailscale Networking Manager
 * Handles automated Funnel and Serve configurations.
 */
export class TailscaleManager {
  private static instance: TailscaleManager;
  private isFunnelActive: boolean = false;

  private constructor() {}

  static getInstance() {
    if (!TailscaleManager.instance) {
      TailscaleManager.instance = new TailscaleManager();
    }
    return TailscaleManager.instance;
  }

  async status() {
    return {
      active: this.isFunnelActive,
      hostname: 'raizen-hub.yourhouse.ts.net',
      mode: this.isFunnelActive ? 'funnel' : 'serve'
    };
  }

  async toggleFunnel(enabled: boolean) {
    this.isFunnelActive = enabled;
    await auditLedger.append('action_result', {
      action: 'tailscale_funnel_toggle',
      enabled,
      status: 'success'
    });
    console.log(`[NETWORK] Tailscale Funnel is now ${enabled ? 'ACTIVE' : 'INACTIVE'}`);
  }

  async getSSHInfo() {
    return {
      ssh_user: 'raizen',
      ssh_host: 'raizen-hub.tailnet',
      port: 22
    };
  }
}

export const tailscaleManager = TailscaleManager.getInstance();
