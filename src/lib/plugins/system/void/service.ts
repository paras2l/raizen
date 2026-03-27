import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { NetworkStateMonitor } from './state-monitor';
import { RadioControlManager } from './radio-manager';
import { BreachTriggerListener } from './trigger-listener';
import { ConnectionTerminationEngine } from './termination-engine';
import { SafeReconnectManager } from './reconnect-manager';
import { VoidConfig, RadioState } from './types';

export class VoidService implements RaizenPlugin {
  id = 'system.void';
  name = "Void Protocol (Instant Signal Lockdown)";
  description = "God-Tier safety: Panic switch that instantly isolates the device from all external communication during breaches.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private monitor: NetworkStateMonitor;
  private radios: RadioControlManager;
  private listener: BreachTriggerListener;
  private term: ConnectionTerminationEngine;
  private reconnect: SafeReconnectManager;
  private config: VoidConfig;

  private radioState: RadioState = 'active';

  constructor(config: VoidConfig) {
    this.monitor = new NetworkStateMonitor();
    this.radios = new RadioControlManager();
    this.listener = new BreachTriggerListener();
    this.term = new ConnectionTerminationEngine();
    this.reconnect = new SafeReconnectManager();
    this.config = config;
  }

  actions: PluginAction[] = [
    {
      id: 'engage_void_lockdown',
      label: 'Engage Void Lockdown',
      description: 'Immediately disable all Wi-Fi, BT, and NFC radios and terminate all active connections.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'restore_communication',
      label: 'Restore Signal',
      description: 'Safely re-enable network interfaces after Master Codeword verification.',
      category: 'system',
      sensitive: true
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[VOID] Signal Lockdown Protocol armed. Monitoring for breach triggers.');
    
    this.listener.onBreach((severity) => {
      if (severity === 'critical' && this.config.autoTriggerOnCritical) {
        this.execute('engage_void_lockdown', { reason: 'AUTO_BREACH_TRIGGER' });
      }
    });
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'engage_void_lockdown':
          this.radioState = 'isolating';
          await this.term.terminateActiveSessions();
          await this.radios.disableAllRadios();
          this.radioState = 'isolated';
          return { success: true, data: { status: 'ISOLATED' }, auditId: auditEntry.id };
        case 'restore_communication':
          const safe = await this.reconnect.verifyEnvironment();
          if (safe) {
            await this.radios.restoreRadios();
            this.radioState = 'active';
            return { success: true, data: { status: 'RESTORED' }, auditId: auditEntry.id };
          }
          return { success: false, error: 'Environment sanity check failed.', auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }
}

// Global Singleton
export const voidProtocol = new VoidService({
  autoTriggerOnCritical: true,
  isolationLevel: 'hard'
});
