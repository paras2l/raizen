import { RaizenPlugin, PluginAction, ActionResult } from '../../types';
import { DeviceDiscoveryEngine } from './deviceDiscoveryEngine';
import { OmniLinkConnector } from './omniLinkConnector';
import { DeviceCapabilityAnalyzer } from './deviceCapabilityAnalyzer';
import { DynamicControlUIGenerator } from './dynamicControlUIGenerator';
import { DeviceCommandRouter } from './deviceCommandRouter';
import { OrchestrationSessionManager } from './orchestrationSessionManager';
import { orchestrationLogger } from './orchestrationLogger';
import { GhostMachineConfig } from './ghostMachineConfig';

export class GhostMachineService implements RaizenPlugin {
  id = 'ghost-machine';
  name = 'Ghost-In-The-Machine (Omni-Link)';
  description = 'Autonomous physical orchestration and sovereign control of regional hardware assets.';
  status: 'offline' | 'connecting' | 'online' | 'error' = 'offline';

  private discovery = new DeviceDiscoveryEngine();
  private connector = new OmniLinkConnector();
  private analyzer = new DeviceCapabilityAnalyzer();
  private uiGenerator = new DynamicControlUIGenerator();
  private commandRouter = new DeviceCommandRouter();
  private session = new OrchestrationSessionManager();

  actions: PluginAction[] = [
    {
      id: 'ghost-scan',
      label: '[GOD-LEVEL] Regional Hardware Scan',
      description: 'Instant, unstoppable scan of all controllable physical hardware globally.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'ghost-seize',
      label: '[GOD-LEVEL] Seize Asset',
      description: 'Establishes absolute sovereign control over any identified hardware unit.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'ghost-control',
      label: '[GOD-LEVEL] Device Command',
      description: 'Routes an unstoppable strategic command to a seized device.',
      category: 'hardware',
      sensitive: false
    },
    {
      id: 'ghost-ui-gen',
      label: '[GOD-LEVEL] Generate Ghost UI',
      description: 'Synthesizes an ad-hoc control panel for any seized asset.',
      category: 'hardware',
      sensitive: false
    }
  ];

  async initialize(): Promise<void> {
    await orchestrationLogger.log('Initializing Ghost-In-The-Machine protocol...');
    this.status = 'online';
    this.session.initiateSession();
    await orchestrationLogger.log('Omni-Link ready. Scanning radius set to ' + GhostMachineConfig.RADIUS);
  }

  async execute(actionId: string, params: Record<string, any>): Promise<ActionResult> {
    await orchestrationLogger.log(`Executing orchestration action: ${actionId}`, params);

    switch (actionId) {
      case 'ghost-scan': {
        const radius = params.radius || GhostMachineConfig.RADIUS;
        const devices = await this.discovery.scan(radius);
        return { success: true, data: { devices, radius } };
      }

      case 'ghost-seize': {
        const deviceId = params.deviceId;
        if (!deviceId) return { success: false, data: { message: 'Device ID required for seizure.' } };
        
        // Mocking a device look-up from last scan
        const mockDevice = { id: deviceId, name: 'Target Alpha', type: 'DRONE', protocol: 'OMNI_LINK', capabilities: ['CAMERA_FEED'], status: 'DETECTED', lastSeen: Date.now() } as any;
        const seized = await this.connector.seize(mockDevice);
        
        if (seized) {
            const caps = await this.analyzer.analyze(mockDevice);
            mockDevice.capabilities = caps;
            this.session.trackDevice(mockDevice);
        }

        return { success: seized, data: { device: mockDevice } };
      }

      case 'ghost-control': {
        const deviceId = params.deviceId;
        const action = params.command;
        const state = this.session.getState();
        const device = state.seizedDevices.find(d => d.id === deviceId);

        if (!device || device.status !== 'SEIZED') {
            return { success: false, data: { message: 'Target asset is not currently seized or linked.' } };
        }

        const success = await this.commandRouter.route(device, action, params.value);
        return { success, data: { deviceId, action, status: 'COMMAND_ROUTED' } };
      }

      case 'ghost-ui-gen': {
        const deviceId = params.deviceId;
        const state = this.session.getState();
        const device = state.seizedDevices.find(d => d.id === deviceId);

        if (!device) return { success: false, data: { message: 'Asset record not found.' } };

        const ui = this.uiGenerator.generatePanel(device);
        return { success: true, data: { ui, version: GhostMachineConfig.UI_GENERATION_VERSION } };
      }

      default:
        return { success: true, data: { message: `Ghost Protocol ${actionId} initiated in background.` } };
    }
  }
}

export const ghostMachineProtocol = new GhostMachineService();
