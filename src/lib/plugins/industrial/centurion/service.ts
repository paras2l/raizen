import { RaizenPlugin, ActionResult, PluginAction } from '../../types';
import { centurionLogger } from './centurionLogger';
import { AssetControlEngine } from './assetControlEngine';
import { OmniConnectionLink } from './omniConnectionLink';
import { AuthorizationKeeper } from './authorizationKeeper';
import { FullPowerController } from './fullPowerController';
import { PhysicalAsset } from './centurionTypes';

export class CenturionProtocolService implements RaizenPlugin {
  id = 'industrial.centurion';
  name = 'Centurion Protocol';
  description = 'Universal Physical Sovereignty & Asset Control';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  actions: PluginAction[] = [
    {
      id: 'centurion-authorize',
      label: 'Authorize Physical Control',
      description: 'Unlock the Centurion system for high-sovereignty hardware control',
      category: 'industrial',
      sensitive: true,
    },
    {
      id: 'centurion-connect',
      label: 'Connect to Physical Asset',
      description: 'Establish a universal link with a local or network device',
      category: 'industrial',
      sensitive: true,
    },
    {
      id: 'centurion-hijack',
      label: 'Seize "Full Power" Control',
      description: 'Take absolute command over a connected hardware asset',
      category: 'industrial',
      sensitive: true,
    },
    {
      id: 'centurion-command',
      label: 'Execute Hardware Command',
      description: 'Send a high-intensity physical command to a hijacked asset',
      category: 'industrial',
      sensitive: true,
    }
  ];

  private engine = new AssetControlEngine();
  private link = new OmniConnectionLink();
  private keeper = new AuthorizationKeeper();
  private controller = new FullPowerController();
  private activeAssets: Map<string, PhysicalAsset> = new Map();

  async initialize(): Promise<void> {
    this.status = 'connecting';
    centurionLogger.log('Centurion Protocol Initializing [ASSET CONTROL STANDBY]');
    this.status = 'online';
    centurionLogger.success('Physical sovereignty layer activated. System is DORMANT.');
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    try {
      switch (actionId) {
        case 'centurion-authorize':
          const token = params.token || '';
          if (this.keeper.requestAuthorization(token)) {
            return { success: true, data: { authorized: true } };
          }
          return { success: false, error: 'Invalid authorization token.' };

        case 'centurion-connect':
          const address = params.address || '';
          const protocol = params.protocol || 'Network';
          if (await this.link.connectToDevice(address, protocol)) {
            const asset: PhysicalAsset = {
              id: `ASSET-${Math.random().toString(36).substr(2, 5)}`,
              type: params.type || 'Device',
              protocol,
              state: 'Active',
              powerLevel: 50,
            };
            this.activeAssets.set(asset.id, asset);
            return { success: true, data: { assetId: asset.id, status: 'Connected' } };
          }
          return { success: false, error: 'Connection failed.' };

        case 'centurion-hijack':
          if (!this.keeper.isSovereign()) {
            return { success: false, error: 'System not authorized for physical control.' };
          }
          const hijackId = params.assetId;
          const target = this.activeAssets.get(hijackId);
          if (target && await this.engine.seizeAsset(target)) {
            return { success: true, data: { assetId: hijackId, status: 'Hijacked' } };
          }
          return { success: false, error: 'Target asset not found or seizure failed.' };

        case 'centurion-command':
          if (!this.keeper.isSovereign()) {
            return { success: false, error: 'Control authorization required.' };
          }
          const commandId = params.assetId;
          const cmdTarget = this.activeAssets.get(commandId);
          if (cmdTarget && cmdTarget.state === 'Hijacked') {
            await this.controller.executePhysicalCommand(params.command, commandId);
            return { success: true, data: { command: params.command, status: 'Executed' } };
          }
          return { success: false, error: 'Asset must be hijacked before command execution.' };

        default:
          centurionLogger.error(`Action not supported: ${actionId}`);
          return { success: false, error: `Action not supported: ${actionId}` };
      }
    } catch (error: any) {
      centurionLogger.error(`Physical control failure: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async shutdown(): Promise<void> {
    this.status = 'offline';
    this.keeper.revoke();
    centurionLogger.log('Centurion Protocol offline [ASSETS RELEASED].');
  }
}

export const centurionProtocol = new CenturionProtocolService();
