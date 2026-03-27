import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { auditLedger } from '../../../governance';
import { LocationMonitor } from './location-monitor';
import { GeofenceManager } from './geofence-manager';
import { SafeZoneRegistry } from './zone-registry';
import { CommandGatekeeper } from './command-gatekeeper';
import { CodewordVerificationModule } from './codeword-verifier';
import { AnchorConfig, GateStatus } from './types';

export class AnchorService implements RaizenPlugin {
  id = 'system.anchor';
  name = "Anchor Protocol (Geometric Location Gating)";
  description = "God-Tier safety: Restricts critical system commands to trusted physical Safe Zones.";
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private monitor: LocationMonitor;
  private geofence: GeofenceManager;
  private registry: SafeZoneRegistry;
  private gatekeeper: CommandGatekeeper;
  private auth: CodewordVerificationModule;
  private config: AnchorConfig;

  private gateStatus: GateStatus = 'adrift';

  constructor(config: AnchorConfig) {
    this.monitor = new LocationMonitor();
    this.geofence = new GeofenceManager();
    this.registry = new SafeZoneRegistry();
    this.gatekeeper = new CommandGatekeeper();
    this.auth = new CodewordVerificationModule();
    this.config = config;
  }

  actions: PluginAction[] = [
    {
      id: 'register_safe_zone',
      label: 'Define Safe Zone',
      description: 'Mark the current location or manual coordinates as a trusted geometric safe zone.',
      category: 'system',
      sensitive: true
    },
    {
      id: 'verify_anchored_state',
      label: 'Check Anchor Status',
      description: 'Verify if the device is currently within an authorized security perimeter.',
      category: 'system',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    this.status = 'online';
    console.log('[ANCHOR] Location Gating active. Monitoring geometric boundaries.');
    this.updateAnchorState();
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    const auditEntry = await auditLedger.append('action_result', { 
      pluginId: this.id, 
      actionId, 
      params 
    });

    try {
      switch (actionId) {
        case 'register_safe_zone':
          this.registry.registerZone({
            id: `zone_${Date.now()}`,
            name: params.name || 'Custom Zone',
            center: params.center || { lat: 0, lng: 0 },
            radiusMeters: params.radius || 100
          });
          return { success: true, data: { status: 'REGISTERED' }, auditId: auditEntry.id };
        case 'verify_anchored_state':
          await this.updateAnchorState();
          return { success: true, data: { status: this.gateStatus }, auditId: auditEntry.id };
        default:
          return { success: false, error: 'Unknown action.', auditId: auditEntry.id };
      }
    } catch (e: any) {
      return { success: false, error: e.message, auditId: auditEntry.id };
    }
  }

  private async updateAnchorState() {
    const pos = await this.monitor.getCurrentPosition();
    const zones = this.registry.getZones();
    const isInside = zones.some(z => this.geofence.isInsideZone(pos, z));
    this.gateStatus = isInside ? 'anchored' : 'adrift';
  }

  // Hook for governance engine
  async validateCommand(actionId: string, metadata: { codeword?: string }): Promise<boolean> {
    if (this.gatekeeper.canExecute(actionId, this.gateStatus === 'anchored')) {
      return true;
    }
    if (metadata.codeword && await this.auth.verifyOverride(metadata.codeword)) {
      return true;
    }
    return false;
  }
}

// Global Singleton
export const anchorPortal = new AnchorService({
  safeZones: [],
  refreshIntervalMs: 60000,
  enableWifiAnchoring: true
});
